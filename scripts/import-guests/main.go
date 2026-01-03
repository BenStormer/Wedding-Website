package main

import (
	"context"
	"encoding/csv"
	"flag"
	"fmt"
	"log"
	"os"
	"regexp"
	"strings"

	"cloud.google.com/go/firestore"
	"golang.org/x/text/cases"
	"golang.org/x/text/language"
)

// Guest represents a guest document in Firestore
type Guest struct {
	FirstName string `firestore:"FirstName"`
	LastName  string `firestore:"LastName"`
	Email     string `firestore:"Email,omitempty"`
	Phone     string `firestore:"Phone,omitempty"`
	Attending *bool  `firestore:"Attending"` // nil = not yet responded
}

// normalizePhone strips all non-digit characters and formats as (XXX) XXX-XXXX
// Accepts various formats: 5551234567, 555-123-4567, (555) 123-4567, +1 555 123 4567, etc.
func normalizePhone(phone string) string {
	if phone == "" {
		return ""
	}

	// Remove all non-digit characters
	re := regexp.MustCompile(`\D`)
	digits := re.ReplaceAllString(phone, "")

	// Handle country code (if 11 digits starting with 1, strip the 1)
	if len(digits) == 11 && digits[0] == '1' {
		digits = digits[1:]
	}

	// Must have exactly 10 digits for US phone number
	if len(digits) != 10 {
		// Return original if we can't normalize (might be international)
		log.Printf("Warning: Could not normalize phone '%s' (got %d digits)", phone, len(digits))
		return phone
	}

	// Format as (XXX) XXX-XXXX
	return fmt.Sprintf("(%s) %s-%s", digits[0:3], digits[3:6], digits[6:10])
}

// normalizeColumnName handles various column name formats
// "First Name", "first_name", "firstname", "FIRSTNAME" -> "firstname"
// "Last Name", "last_name", "lastname" -> "lastname"
// "Phone Number", "phone_number", "phone" -> "phone"
// "Email Address", "email_address", "email" -> "email"
func normalizeColumnName(col string) string {
	col = strings.ToLower(strings.TrimSpace(col))
	col = strings.ReplaceAll(col, " ", "")
	col = strings.ReplaceAll(col, "_", "")

	// Handle common aliases
	switch col {
	case "firstname", "first":
		return "firstname"
	case "lastname", "last":
		return "lastname"
	case "phone", "phonenumber", "telephone", "tel", "mobile", "cell":
		return "phone"
	case "email", "emailaddress", "mail":
		return "email"
	default:
		return col
	}
}

func main() {
	// Parse command line flags
	csvPath := flag.String("csv", "", "Path to CSV file with guest list")
	projectID := flag.String("project", "", "GCP Project ID")
	dryRun := flag.Bool("dry-run", false, "Print what would be imported without actually importing")
	flag.Parse()

	if *csvPath == "" {
		log.Fatal("Please provide a CSV file path with -csv flag")
	}
	if *projectID == "" {
		log.Fatal("Please provide a GCP project ID with -project flag")
	}

	// Read CSV file
	guests, err := readCSV(*csvPath)
	if err != nil {
		log.Fatalf("Failed to read CSV: %v", err)
	}

	log.Printf("Found %d guests in CSV file", len(guests))

	if *dryRun {
		log.Println("DRY RUN - Would import the following guests:")
		for i, g := range guests {
			log.Printf("  %d. %s %s (%s, %s)", i+1, g.FirstName, g.LastName, g.Email, g.Phone)
		}
		return
	}

	// Connect to Firestore
	ctx := context.Background()
	client, err := firestore.NewClient(ctx, *projectID)
	if err != nil {
		log.Fatalf("Failed to create Firestore client: %v", err)
	}
	defer client.Close()

	// Import guests
	imported := 0
	for _, guest := range guests {
		// Use FirstName_LastName as document ID for easy lookup
		docID := fmt.Sprintf("%s_%s",
			strings.ToLower(guest.FirstName),
			strings.ToLower(guest.LastName))

		_, err := client.Collection("guests").Doc(docID).Set(ctx, guest)
		if err != nil {
			log.Printf("Failed to import %s %s: %v", guest.FirstName, guest.LastName, err)
			continue
		}
		log.Printf("Imported: %s %s", guest.FirstName, guest.LastName)
		imported++
	}

	log.Printf("Successfully imported %d/%d guests", imported, len(guests))
}

func readCSV(path string) ([]Guest, error) {
	file, err := os.Open(path)
	if err != nil {
		return nil, err
	}
	defer file.Close()

	reader := csv.NewReader(file)

	// Read header row
	header, err := reader.Read()
	if err != nil {
		return nil, fmt.Errorf("failed to read header: %w", err)
	}

	// Map column names to indices (case-insensitive, handles variations)
	colIndex := make(map[string]int)
	for i, col := range header {
		normalized := normalizeColumnName(col)
		colIndex[normalized] = i
	}

	// Verify required columns exist
	if _, ok := colIndex["firstname"]; !ok {
		return nil, fmt.Errorf("missing required column: firstname (or first_name, first name)")
	}
	if _, ok := colIndex["lastname"]; !ok {
		return nil, fmt.Errorf("missing required column: lastname (or last_name, last name)")
	}

	// Read all records
	records, err := reader.ReadAll()
	if err != nil {
		return nil, fmt.Errorf("failed to read records: %w", err)
	}

	caser := cases.Title(language.English)
	var guests []Guest

	for _, record := range records {
		guest := Guest{
			FirstName: caser.String(strings.ToLower(strings.TrimSpace(record[colIndex["firstname"]]))),
			LastName:  caser.String(strings.ToLower(strings.TrimSpace(record[colIndex["lastname"]]))),
			Attending: nil, // Default to nil (not yet responded)
		}

		// Optional fields
		if idx, ok := colIndex["email"]; ok && idx < len(record) {
			guest.Email = strings.ToLower(strings.TrimSpace(record[idx]))
		}
		if idx, ok := colIndex["phone"]; ok && idx < len(record) {
			guest.Phone = normalizePhone(strings.TrimSpace(record[idx]))
		}

		// Skip empty rows
		if guest.FirstName == "" || guest.LastName == "" {
			continue
		}

		guests = append(guests, guest)
	}

	return guests, nil
}

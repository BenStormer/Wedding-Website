package main

import (
	"context"
	"encoding/csv"
	"flag"
	"fmt"
	"log"
	"os"
	"strconv"
	"strings"
)

import (
	"cloud.google.com/go/firestore"
)

// RegistryItem represents a registry item document in Firestore
type RegistryItem struct {
	ID                string  `firestore:"id"`
	Label             string  `firestore:"label"`
	Description       string  `firestore:"description"`
	Version           string  `firestore:"version,omitempty"`
	Price             float64 `firestore:"price"`
	Image             string  `firestore:"image"`
	Alt               string  `firestore:"alt"`
	RequestedQuantity *int    `firestore:"requested_quantity"`
	ReceivedQuantity  int     `firestore:"received_quantity"`
	PurchaseLink      string  `firestore:"purchase_link"`
}

// normalizeColumnName handles various column name formats
func normalizeColumnName(col string) string {
	col = strings.ToLower(strings.TrimSpace(col))
	col = strings.ReplaceAll(col, " ", "")
	col = strings.ReplaceAll(col, "_", "")
	col = strings.ReplaceAll(col, "-", "")

	// Handle common aliases
	switch col {
	case "id", "itemid":
		return "id"
	case "label", "name", "itemname", "title":
		return "label"
	case "description", "desc":
		return "description"
	case "price", "cost", "amount":
		return "price"
	case "image", "imageurl", "img", "photo":
		return "image"
	case "alt", "alttext", "imagealt":
		return "alt"
	case "requestedquantity", "quantity", "qty", "requested", "needed":
		return "requestedquantity"
	case "purchaselink", "link", "url", "buylink", "storelink":
		return "purchaselink"
	case "version", "variant", "spec", "specs", "specifications":
		return "version"
	default:
		return col
	}
}

// generateID creates a URL-friendly ID from the label
func generateID(label string) string {
	id := strings.ToLower(label)
	id = strings.ReplaceAll(id, " ", "-")
	// Remove any characters that aren't alphanumeric or hyphens
	var result strings.Builder
	for _, r := range id {
		if (r >= 'a' && r <= 'z') || (r >= '0' && r <= '9') || r == '-' {
			result.WriteRune(r)
		}
	}
	return result.String()
}

func main() {
	// Parse command line flags
	csvPath := flag.String("csv", "", "Path to CSV file with registry items")
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
	items, err := readCSV(*csvPath)
	if err != nil {
		log.Fatalf("Failed to read CSV: %v", err)
	}

	log.Printf("Found %d registry items in CSV file", len(items))

	if *dryRun {
		log.Println("DRY RUN - Would import the following registry items:")
		for i, item := range items {
			qtyStr := "unlimited"
			if item.RequestedQuantity != nil {
				qtyStr = fmt.Sprintf("%d", *item.RequestedQuantity)
			}
			log.Printf("  %d. %s (ID: %s, $%.2f, qty: %s)", i+1, item.Label, item.ID, item.Price, qtyStr)
			if item.Version != "" {
				log.Printf("      Version: %s", item.Version)
			}
			log.Printf("      Description: %s", truncate(item.Description, 60))
			log.Printf("      Link: %s", item.PurchaseLink)
			if item.Image != "" {
				log.Printf("      Image: %s", item.Image)
			}
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

	// Import registry items
	imported := 0
	for _, item := range items {
		_, err := client.Collection("registry_items").Doc(item.ID).Set(ctx, item)
		if err != nil {
			log.Printf("Failed to import %s: %v", item.Label, err)
			continue
		}
		log.Printf("Imported: %s (ID: %s)", item.Label, item.ID)
		imported++
	}

	log.Printf("Successfully imported %d/%d registry items", imported, len(items))
}

func truncate(s string, maxLen int) string {
	if len(s) <= maxLen {
		return s
	}
	return s[:maxLen-3] + "..."
}

func readCSV(path string) ([]RegistryItem, error) {
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
	if _, ok := colIndex["label"]; !ok {
		return nil, fmt.Errorf("missing required column: label (or name, title)")
	}

	// Read all records
	records, err := reader.ReadAll()
	if err != nil {
		return nil, fmt.Errorf("failed to read records: %w", err)
	}

	var items []RegistryItem

	for lineNum, record := range records {
		label := strings.TrimSpace(record[colIndex["label"]])
		if label == "" {
			continue // Skip empty rows
		}

		item := RegistryItem{
			Label:            label,
			ReceivedQuantity: 0, // Always start at 0
		}

		// ID - use provided or generate from label
		if idx, ok := colIndex["id"]; ok && idx < len(record) && strings.TrimSpace(record[idx]) != "" {
			item.ID = strings.TrimSpace(record[idx])
		} else {
			item.ID = generateID(label)
		}

		// Description
		if idx, ok := colIndex["description"]; ok && idx < len(record) {
			item.Description = strings.TrimSpace(record[idx])
		}

		// Price
		if idx, ok := colIndex["price"]; ok && idx < len(record) {
			priceStr := strings.TrimSpace(record[idx])
			priceStr = strings.TrimPrefix(priceStr, "$")
			priceStr = strings.ReplaceAll(priceStr, ",", "")
			if priceStr != "" {
				price, err := strconv.ParseFloat(priceStr, 64)
				if err != nil {
					log.Printf("Warning: Invalid price '%s' on line %d, defaulting to 0", record[idx], lineNum+2)
				} else {
					item.Price = price
				}
			}
		}

		// Image URL
		if idx, ok := colIndex["image"]; ok && idx < len(record) {
			item.Image = strings.TrimSpace(record[idx])
		}

		// Alt text - default to label if not provided
		if idx, ok := colIndex["alt"]; ok && idx < len(record) && strings.TrimSpace(record[idx]) != "" {
			item.Alt = strings.TrimSpace(record[idx])
		} else {
			item.Alt = label
		}

		// Requested quantity - nil means unlimited
		if idx, ok := colIndex["requestedquantity"]; ok && idx < len(record) {
			qtyStr := strings.ToLower(strings.TrimSpace(record[idx]))
			if qtyStr != "" && qtyStr != "unlimited" && qtyStr != "null" && qtyStr != "-" {
				qty, err := strconv.Atoi(qtyStr)
				if err != nil {
					log.Printf("Warning: Invalid quantity '%s' on line %d, defaulting to unlimited", record[idx], lineNum+2)
				} else {
					item.RequestedQuantity = &qty
				}
			}
		}

		// Purchase link
		if idx, ok := colIndex["purchaselink"]; ok && idx < len(record) {
			item.PurchaseLink = strings.TrimSpace(record[idx])
		}

		// Version (optional)
		if idx, ok := colIndex["version"]; ok && idx < len(record) {
			item.Version = strings.TrimSpace(record[idx])
		}

		items = append(items, item)
	}

	return items, nil
}

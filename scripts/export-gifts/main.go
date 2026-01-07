package main

import (
	"context"
	"encoding/csv"
	"flag"
	"fmt"
	"log"
	"os"
	"sort"
	"time"

	"cloud.google.com/go/firestore"
	"google.golang.org/api/iterator"
)

// GiftRecord represents a gift document in Firestore
type GiftRecord struct {
	ID        string
	ItemLabel string     `firestore:"item_label"`
	FirstName string     `firestore:"first_name"`
	LastName  string     `firestore:"last_name"`
	Email     string     `firestore:"email"`
	Quantity  int        `firestore:"quantity"`
	CreatedAt *time.Time `firestore:"created_at"`
}

func main() {
	// Parse command line flags
	projectID := flag.String("project", "", "GCP Project ID")
	outputPath := flag.String("output", "gift_records.csv", "Output CSV file path")
	sortBy := flag.String("sort", "date", "Sort by: date, name, or item")
	flag.Parse()

	if *projectID == "" {
		log.Fatal("Please provide a GCP project ID with -project flag")
	}

	// Connect to Firestore
	ctx := context.Background()
	client, err := firestore.NewClient(ctx, *projectID)
	if err != nil {
		log.Fatalf("Failed to create Firestore client: %v", err)
	}
	defer client.Close()

	// Fetch all gift records
	gifts, err := fetchGifts(ctx, client)
	if err != nil {
		log.Fatalf("Failed to fetch gifts: %v", err)
	}

	if len(gifts) == 0 {
		log.Println("No gift records found in the database.")
		return
	}

	// Sort gifts
	sortGifts(gifts, *sortBy)

	// Write to CSV
	if err := writeCSV(*outputPath, gifts); err != nil {
		log.Fatalf("Failed to write CSV: %v", err)
	}

	log.Printf("Successfully exported %d gift records to %s", len(gifts), *outputPath)

	// Print summary
	printSummary(gifts)
}

func fetchGifts(ctx context.Context, client *firestore.Client) ([]GiftRecord, error) {
	iter := client.Collection("gifts").Documents(ctx)
	defer iter.Stop()

	var gifts []GiftRecord
	for {
		doc, err := iter.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return nil, err
		}

		var gift GiftRecord
		if err := doc.DataTo(&gift); err != nil {
			log.Printf("Warning: Failed to parse gift document %s: %v", doc.Ref.ID, err)
			continue
		}
		gift.ID = doc.Ref.ID
		gifts = append(gifts, gift)
	}

	return gifts, nil
}

func sortGifts(gifts []GiftRecord, sortBy string) {
	switch sortBy {
	case "name":
		sort.Slice(gifts, func(i, j int) bool {
			if gifts[i].LastName != gifts[j].LastName {
				return gifts[i].LastName < gifts[j].LastName
			}
			return gifts[i].FirstName < gifts[j].FirstName
		})
	case "item":
		sort.Slice(gifts, func(i, j int) bool {
			return gifts[i].ItemLabel < gifts[j].ItemLabel
		})
	case "date":
		fallthrough
	default:
		sort.Slice(gifts, func(i, j int) bool {
			if gifts[i].CreatedAt == nil {
				return false
			}
			if gifts[j].CreatedAt == nil {
				return true
			}
			return gifts[i].CreatedAt.Before(*gifts[j].CreatedAt)
		})
	}
}

func writeCSV(path string, gifts []GiftRecord) error {
	file, err := os.Create(path)
	if err != nil {
		return err
	}
	defer file.Close()

	writer := csv.NewWriter(file)
	defer writer.Flush()

	// Write header
	header := []string{
		"First Name",
		"Last Name",
		"Email",
		"Item",
		"Quantity",
		"Date",
	}
	if err := writer.Write(header); err != nil {
		return err
	}

	// Write records
	for _, gift := range gifts {
		dateStr := ""
		if gift.CreatedAt != nil {
			dateStr = gift.CreatedAt.Format("2006-01-02 3:04 PM")
		}

		record := []string{
			gift.FirstName,
			gift.LastName,
			gift.Email,
			gift.ItemLabel,
			fmt.Sprintf("%d", gift.Quantity),
			dateStr,
		}
		if err := writer.Write(record); err != nil {
			return err
		}
	}

	return nil
}

func printSummary(gifts []GiftRecord) {
	fmt.Println("\n=== Gift Summary ===")

	// Count by item
	itemCounts := make(map[string]int)
	itemQuantities := make(map[string]int)

	for _, gift := range gifts {
		itemCounts[gift.ItemLabel]++
		itemQuantities[gift.ItemLabel] += gift.Quantity
	}

	fmt.Printf("\nTotal gift records: %d\n", len(gifts))

	fmt.Println("\nBy Item:")
	// Sort items by count for display
	type itemStat struct {
		name     string
		count    int
		quantity int
	}
	var stats []itemStat
	for name, count := range itemCounts {
		stats = append(stats, itemStat{name, count, itemQuantities[name]})
	}
	sort.Slice(stats, func(i, j int) bool {
		return stats[i].count > stats[j].count
	})

	for _, stat := range stats {
		fmt.Printf("  - %s: %d record(s), %d total quantity\n", stat.name, stat.count, stat.quantity)
	}
}

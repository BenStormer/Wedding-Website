package seed

import (
	"context"
	"log"

	"cloud.google.com/go/firestore"
	"github.com/BenStormer/Wedding-Website/backend/internal/model"
)

// SeedData populates the Firestore emulator with sample data for local development.
// This should only be called in local environment.
func SeedData(ctx context.Context, client *firestore.Client) error {
	log.Println("Seeding database with sample data...")

	guests := []model.Guest{
		{
			ID:        "1",
			FirstName: "John",
			LastName:  "Doe",
			Email:     "john@example.com",
			Phone:     "123-456-7890",
			Attending: nil,
			UpdatedAt: nil,
		},
		{
			ID:        "2",
			FirstName: "Jane",
			LastName:  "Smith",
			Email:     "jane@example.com",
			Phone:     "098-765-4321",
			Attending: nil,
			UpdatedAt: nil,
		},
	}

	for _, guest := range guests {
		_, err := client.Collection("guests").Doc(guest.ID).Set(ctx, guest)
		if err != nil {
			log.Printf("Failed to add guest %s: %v", guest.FirstName, err)
			return err
		}
		log.Printf("Added guest: %s %s", guest.FirstName, guest.LastName)
	}

	log.Println("Seed data populated successfully")
	return nil
}

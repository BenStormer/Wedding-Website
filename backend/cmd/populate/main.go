package main

import (
	"context"
	"log"
	"os"

	"cloud.google.com/go/firestore"
	"github.com/BenStormer/Wedding-Website/backend/internal/config"
	"github.com/BenStormer/Wedding-Website/backend/internal/model"
)

func main() {
	// Load config (should be local)
	cfg := config.Load()
	if cfg.Environment != "local" {
		log.Fatal("This script is only for local environment")
	}

	// Set emulator
	os.Setenv("FIRESTORE_EMULATOR_HOST", cfg.EmulatorHost)

	ctx := context.Background()
	client, err := firestore.NewClient(ctx, cfg.FirestoreProject)
	if err != nil {
		log.Fatalf("Failed to create client: %v", err)
	}
	defer client.Close()

	// Mock data
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
		// Add more as needed
	}

	// Add to Firestore
	for _, guest := range guests {
		_, err := client.Collection("guests").Doc(guest.ID).Set(ctx, guest)
		if err != nil {
			log.Printf("Failed to add guest %s: %v", guest.FirstName, err)
		} else {
			log.Printf("Added guest: %s %s", guest.FirstName, guest.LastName)
		}
	}

	log.Println("Mock data populated")
}

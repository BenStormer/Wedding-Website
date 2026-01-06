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

	// Seed guests
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

	// Seed registry items
	registryItems := []model.RegistryItem{
		{
			ID:                "family-recipes",
			Label:             "Family Recipes",
			Description:       "Share your favorite family recipes with us! We'd love to cook your cherished dishes in our new home together.",
			Price:             0,
			Image:             "https://picsum.photos/seed/recipes/800/600",
			Alt:               "Handwritten recipe cards",
			RequestedQuantity: nil,
			ReceivedQuantity:  0,
			PurchaseLink:      "",
		},
		{
			ID:                "kitchenaid-mixer",
			Label:             "KitchenAid Stand Mixer",
			Description:       "A classic kitchen essential for baking together. We would love the Artisan series in any neutral color!",
			Price:             350,
			Image:             "https://picsum.photos/seed/mixer/800/600",
			Alt:               "KitchenAid Stand Mixer",
			RequestedQuantity: intPtr(1),
			ReceivedQuantity:  0,
			PurchaseLink:      "https://www.williams-sonoma.com",
		},
		{
			ID:                "le-creuset",
			Label:             "Le Creuset Dutch Oven",
			Description:       "Perfect for cozy soups and stews. The 5.5 quart size in any color would be wonderful.",
			Price:             400,
			Image:             "https://picsum.photos/seed/dutchoven/800/600",
			Alt:               "Le Creuset Dutch Oven",
			RequestedQuantity: intPtr(1),
			ReceivedQuantity:  0,
			PurchaseLink:      "https://www.lecreuset.com",
		},
		{
			ID:                "towel-set",
			Label:             "Luxury Bath Towel Set",
			Description:       "Soft, plush towels for our new home. We prefer white or neutral tones.",
			Price:             120,
			Image:             "https://picsum.photos/seed/towels/800/600",
			Alt:               "Luxury bath towels",
			RequestedQuantity: intPtr(2),
			ReceivedQuantity:  1,
			PurchaseLink:      "https://www.parachutehome.com",
		},
		{
			ID:                "dyson-vacuum",
			Label:             "Dyson Vacuum",
			Description:       "A powerful cordless vacuum to keep our home spotless. The V15 would be amazing!",
			Price:             650,
			Image:             "https://picsum.photos/seed/vacuum/800/600",
			Alt:               "Dyson cordless vacuum",
			RequestedQuantity: intPtr(1),
			ReceivedQuantity:  0,
			PurchaseLink:      "https://www.dyson.com",
		},
		{
			ID:                "dinner-plates",
			Label:             "Dinner Plate Set",
			Description:       "Beautiful everyday dinnerware for hosting friends and family. Service for 8 preferred.",
			Price:             200,
			Image:             "https://picsum.photos/seed/plates/800/600",
			Alt:               "Ceramic dinner plates",
			RequestedQuantity: intPtr(1),
			ReceivedQuantity:  0,
			PurchaseLink:      "https://www.crateandbarrel.com",
		},
	}

	for _, item := range registryItems {
		_, err := client.Collection("registry_items").Doc(item.ID).Set(ctx, item)
		if err != nil {
			log.Printf("Failed to add registry item %s: %v", item.Label, err)
			return err
		}
		log.Printf("Added registry item: %s", item.Label)
	}

	log.Println("Seed data populated successfully")
	return nil
}

// Helper function to create pointer to int
func intPtr(i int) *int {
	return &i
}

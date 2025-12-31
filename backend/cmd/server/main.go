package main

import (
	"context"
	"flag"
	"log"
	"net/http"
	"os"
	"time"

	"cloud.google.com/go/firestore"
	"github.com/BenStormer/Wedding-Website/backend/internal/api"
	"github.com/BenStormer/Wedding-Website/backend/internal/config"
	"github.com/BenStormer/Wedding-Website/backend/internal/middleware"
	"github.com/BenStormer/Wedding-Website/backend/internal/repository"
	"github.com/BenStormer/Wedding-Website/backend/internal/seed"
	"github.com/BenStormer/Wedding-Website/backend/internal/service"
)

func main() {
	// Parse command line flags
	seedFlag := flag.Bool("seed", false, "Seed the database with sample data and exit (local env only)")
	flag.Parse()

	// 1. Load config based on environment (APP_ENV=local/sqa/prod)
	cfg := config.Load()
	log.Printf("Starting in %s environment", cfg.Environment)

	// Handle seed command
	if *seedFlag {
		if cfg.Environment != "local" {
			log.Fatal("Seeding is only allowed in local environment")
		}

		// Set emulator host for Firestore client
		os.Setenv("FIRESTORE_EMULATOR_HOST", cfg.EmulatorHost)

		ctx := context.Background()
		client, err := firestore.NewClient(ctx, cfg.FirestoreProject)
		if err != nil {
			log.Fatalf("Failed to create Firestore client: %v", err)
		}
		defer client.Close()

		if err := seed.SeedData(ctx, client); err != nil {
			log.Fatalf("Failed to seed data: %v", err)
		}
		return
	}

	// 2. Initialize Firestore repository
	rsvpRepo, err := repository.NewFirestoreRsvpRepository(cfg)
	if err != nil {
		log.Fatalf("Failed to initialize Firestore: %v", err)
	}
	defer rsvpRepo.Close()

	// 3. Wire up layers
	rsvpService := service.NewRsvpService(rsvpRepo)
	rsvpHandler := api.NewRsvpHandler(rsvpService)

	// 4. Set up rate limiter (10 requests per minute per IP)
	rateLimiter := middleware.NewRateLimiter(10, time.Minute)
	defer rateLimiter.Stop()

	// 5. Set up routes with rate limiting
	http.HandleFunc("/v1/api/rsvp", rateLimiter.Middleware(rsvpHandler.HandleRsvp))

	// 6. Start server
	log.Printf("Server listening on :%s", cfg.Port)
	log.Fatal(http.ListenAndServe(":"+cfg.Port, nil))
}

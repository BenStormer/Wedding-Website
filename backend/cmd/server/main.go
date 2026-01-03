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

	// 2. Initialize shared Firestore client
	if cfg.UseEmulator {
		os.Setenv("FIRESTORE_EMULATOR_HOST", cfg.EmulatorHost)
	}
	ctx := context.Background()
	firestoreClient, err := firestore.NewClient(ctx, cfg.FirestoreProject)
	if err != nil {
		log.Fatalf("Failed to create Firestore client: %v", err)
	}
	defer firestoreClient.Close()

	// 3. Initialize repositories with shared client
	rsvpRepo, err := repository.NewFirestoreRsvpRepository(cfg)
	if err != nil {
		log.Fatalf("Failed to initialize RSVP repository: %v", err)
	}
	defer rsvpRepo.Close()

	registryRepo := repository.NewFirestoreRegistryRepository(cfg, firestoreClient)

	// 4. Wire up layers
	rsvpService := service.NewRsvpService(rsvpRepo)
	rsvpHandler := api.NewRsvpHandler(rsvpService)

	registryService := service.NewRegistryService(registryRepo)
	registryHandler := api.NewRegistryHandler(registryService)

	// 5. Set up rate limiter (10 requests per minute per IP)
	rateLimiter := middleware.NewRateLimiter(10, time.Minute)
	defer rateLimiter.Stop()

	// 6. Set up routes with rate limiting
	http.HandleFunc("/v1/api/rsvp", rateLimiter.Middleware(rsvpHandler.HandleRsvp))
	http.HandleFunc("/v1/api/registry/gift", rateLimiter.Middleware(registryHandler.HandleGift))

	// Health check endpoint for Cloud Run startup probe
	http.HandleFunc("/health", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		w.Write([]byte(`{"status":"healthy"}`))
	})

	// 7. Start server
	log.Printf("Server listening on :%s", cfg.Port)
	log.Fatal(http.ListenAndServe(":"+cfg.Port, nil))
}

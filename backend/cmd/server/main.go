package main

import (
	"log"
	"net/http"

	"github.com/BenStormer/Wedding-Website/backend/internal/api"
	"github.com/BenStormer/Wedding-Website/backend/internal/config"
	"github.com/BenStormer/Wedding-Website/backend/internal/repository"
	"github.com/BenStormer/Wedding-Website/backend/internal/service"
)

func main() {
	// 1. Load config based on environment (APP_ENV=local/sqa/prod)
	cfg := config.Load()
	log.Printf("Starting server in %s environment", cfg.Environment)

	// 2. Initialize Firestore repository
	rsvpRepo, err := repository.NewFirestoreRsvpRepository(cfg)
	if err != nil {
		log.Fatalf("Failed to initialize Firestore: %v", err)
	}
	defer rsvpRepo.Close()

	// 3. Wire up layers
	rsvpService := service.NewRsvpService(rsvpRepo)
	rsvpHandler := api.NewRsvpHandler(rsvpService)

	// 4. Set up routes
	http.HandleFunc("/v1/api/rsvp", rsvpHandler.HandleRsvp)

	// 5. Start server
	log.Printf("Server listening on :%s", cfg.Port)
	log.Fatal(http.ListenAndServe(":"+cfg.Port, nil))
}

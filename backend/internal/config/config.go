package config

import (
	"os"
)

type Config struct {
	Environment      string // local, sqa, prod
	FirestoreProject string
	UseEmulator      bool
	EmulatorHost     string // e.g., "localhost:8741"
	Port             string // HTTP server port
}

func Load() *Config {
	env := os.Getenv("APP_ENV")
	if env == "" {
		env = "local" // Default to local
	}

	cfg := &Config{
		Environment: env,
		Port:        getEnvOrDefault("PORT", "8080"),
	}

	// Set defaults based on environment
	switch env {
	case "local":
		cfg.FirestoreProject = "wedding-website-local"
		cfg.UseEmulator = true
		cfg.EmulatorHost = getEnvOrDefault("FIRESTORE_EMULATOR_HOST", "localhost:8741")
	case "sqa":
		cfg.FirestoreProject = "wedding-website-sqa"
		cfg.UseEmulator = false
	case "prod":
		cfg.FirestoreProject = "wedding-website-prod"
		cfg.UseEmulator = false
	}

	// Allow environment variable overrides for Terraform/Cloud Run deployments
	if projectID := os.Getenv("FIRESTORE_PROJECT_ID"); projectID != "" {
		cfg.FirestoreProject = projectID
	}

	return cfg
}

func getEnvOrDefault(key, defaultValue string) string {
	if value := os.Getenv(key); value != "" {
		return value
	}
	return defaultValue
}

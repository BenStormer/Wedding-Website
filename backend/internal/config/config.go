package config

import (
	"os"
)

type Config struct {
	Environment      string // local, sqa, prod
	FirestoreProject string
	UseEmulator      bool
	EmulatorHost     string // e.g., "localhost:8081"
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

	switch env {
	case "local":
		cfg.FirestoreProject = "wedding-website-local"
		cfg.UseEmulator = true
		cfg.EmulatorHost = "localhost:8741"
	case "sqa":
		cfg.FirestoreProject = "wedding-website-sqa-placeholder"
		cfg.UseEmulator = false
	case "prod":
		cfg.FirestoreProject = "wedding-website-prod-placeholder"
		cfg.UseEmulator = false
	}

	return cfg
}

func getEnvOrDefault(key, defaultValue string) string {
	if value := os.Getenv(key); value != "" {
		return value
	}
	return defaultValue
}

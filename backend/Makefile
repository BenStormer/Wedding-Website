.PHONY: dev build test seed emulator clean

# Start the server locally (assumes emulator is running)
dev:
	APP_ENV=local go run ./cmd/server

# Build the binary for Linux (Cloud Run)
build:
	CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -o bin/server ./cmd/server

# Build for local OS
build-local:
	go build -o bin/server ./cmd/server

# Run tests
test:
	go test ./...

# Seed local Firestore emulator with sample data
seed:
	APP_ENV=local go run ./cmd/server --seed

# Start Firestore emulator
emulator:
	gcloud emulators firestore start --host-port=localhost:8741

# Clean build artifacts
clean:
	rm -rf bin/

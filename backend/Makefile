.PHONY: dev build test seed emulator clean build-and-push deploy

# Configuration variables
GCP_PROJECT = $(shell gcloud config get-value project)
GCP_REGION ?= us-central1
SERVICE_NAME ?= wedding-website-api
REPO_NAME ?= wedding-backend
IMAGE_TAG ?= latest
IMAGE_URL ?= ${GCP_REGION}-docker.pkg.dev/${GCP_PROJECT}/${REPO_NAME}/${SERVICE_NAME}:${IMAGE_TAG}

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

# Configure Docker for Artifact Registry (run once)
docker-auth:
	gcloud auth configure-docker ${GCP_REGION}-docker.pkg.dev

# Build Docker image and push to Artifact Registry
build-and-push: docker-auth
	@echo "Building Docker image..."
	docker build -t ${IMAGE_URL} .
	@echo "Pushing to Artifact Registry..."
	docker push ${IMAGE_URL}
	@echo "Image pushed successfully to ${IMAGE_URL}!"

# Deploy to Cloud Run
deploy:
	@echo "Deploying to Cloud Run..."
	gcloud run deploy ${SERVICE_NAME} \
		--image ${IMAGE_URL} \
		--project ${GCP_PROJECT} \
		--region ${GCP_REGION} \
		--platform managed \
		--max-instances 2 \
		--allow-unauthenticated
	@echo "Deployment complete!"

# Build stage
FROM golang:1.25-alpine AS builder

WORKDIR /app

# Copy dependency files first for better caching
COPY go.mod go.sum ./
RUN go mod download

# Copy source code
COPY . .

# Build the binary
RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -o server ./cmd/server

# Runtime stage
FROM gcr.io/distroless/static-debian12

# Copy the binary from builder
COPY --from=builder /app/server /server

# Cloud Run uses PORT env var (default 8080)
EXPOSE 8080

# Run the server
CMD ["/server"]

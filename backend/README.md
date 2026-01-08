# Wedding Website Backend

Go REST API for RSVP submissions and gift registry management, backed by Google Cloud Firestore.

---

## API Endpoints

### Health Check

```
GET /health
```

Returns `{"status":"healthy"}` — used by Cloud Run for startup probes.

### RSVP

```
PATCH /v1/api/rsvp
POST  /v1/api/rsvp  (with X-HTTP-Method-Override: PATCH)
```

Submit or update an RSVP. Looks up the guest by first/last name and records their attendance status.

**Request Body:**

```json
{
  "firstname": "John",
  "lastname": "Doe",
  "email": "john@example.com",
  "phone": "555-123-4567",
  "attending": true
}
```

**Response Body:**

```json
{
  "success": true,
  "message": "RSVP submitted successfully"
}
```

### Registry Items

```
GET /v1/api/registry/items
```

Returns all registry items with their current gifted quantities.

**Response Body:**

```json
{
  "success": true,
  "items": [
    {
      "id": "item-123",
      "label": "Kitchen Aid Mixer",
      "description": "Professional 5-quart stand mixer",
      "version": "Matte Black",
      "price": 349.99,
      "image": "https://example.com/mixer.jpg",
      "alt": "Kitchen Aid stand mixer",
      "requested_quantity": 1,
      "received_quantity": 0,
      "purchase_link": "https://example.com/buy"
    }
  ]
}
```

### Record Gift

```
POST /v1/api/registry/gift
```

Records a gift purchase against a registry item.

**Request Body:**

```json
{
  "firstname": "Jane",
  "lastname": "Smith",
  "email": "jane@example.com",
  "itemLabel": "Kitchen Aid Mixer",
  "quantity": 1
}
```

**Response Body:**

```json
{
  "success": true,
  "message": "Gift recorded successfully"
}
```

---

## Project Structure

```
backend/
├── cmd/
│   └── server/
│       └── main.go           # Application entry point
├── internal/
│   ├── api/                  # HTTP handlers
│   │   ├── rsvp_handler.go
│   │   └── registry_handler.go
│   ├── config/               # Environment-based configuration
│   │   └── config.go
│   ├── middleware/           # HTTP middleware
│   │   └── ratelimit.go      # Rate limiting + CORS
│   ├── model/                # Data structures
│   │   ├── rsvp.go
│   │   └── registry.go
│   ├── repository/           # Firestore data access
│   │   ├── rsvp.go
│   │   └── registry.go
│   ├── service/              # Business logic
│   │   ├── rsvp.go
│   │   └── registry.go
│   ├── seed/                 # Local development data seeding
│   │   └── seed.go
│   └── util/                 # Shared utilities
│       └── normalize.go      # Input normalization (names, emails, phones)
├── Dockerfile
├── Makefile
├── go.mod
└── go.sum
```

---

## Architecture

The codebase follows a layered architecture:

```
HTTP Request
    │
    ▼
┌─────────────────┐
│   Middleware    │  Rate limiting, CORS headers
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│    Handlers     │  Request validation, JSON encoding/decoding
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│    Services     │  Business logic, error handling
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Repositories   │  Firestore queries
└─────────────────┘
```

---

## Key Design Decisions

### Rate Limiting

An in-memory rate limiter restricts each IP to **10 requests per minute**.

- Extracts client IP from `X-Forwarded-For` header (set by Cloud Run and Cloudflare)
- Background cleanup goroutine removes stale entries to prevent memory growth
- Preflight OPTIONS requests are not rate-limited

### CORS Restrictions

Cross-origin requests are restricted to the production domains:

- `https://aspenandbenjamin.com`
- `https://www.aspenandbenjamin.com`

### HTTP Method Override

The RSVP endpoint accepts `POST` with an `X-HTTP-Method-Override: PATCH` header as an alternative to `PATCH`.

### Input Normalization

All user input (names, emails, phone numbers) is normalized before processing:

- Names are trimmed and title-cased
- Emails are lowercased and trimmed
- Phone numbers have non-digit characters stripped

This ensures consistent data storage and reliable guest lookups.

### Environment-Based Configuration

The server supports two environments via the `APP_ENV` variable:

- `local` — Uses Firestore emulator
- `prod` — Connects to production Firestore

Configuration is loaded at startup and determines database connections and emulator usage.

---

## Local Development

### Prerequisites

- Go 1.25.5+ (see `go.mod`)
- Firebase CLI (for Firestore emulator)

### Running Locally

1. Start the Firestore emulator:

   ```bash
   firebase emulators:start --only firestore
   ```

2. Seed the database (optional):

   ```bash
   go run ./cmd/server/main.go -seed
   ```

3. Start the server:
   ```bash
   go run ./cmd/server/main.go
   ```

The server runs on `http://localhost:8080` by default.

### Running Tests

```bash
go test ./...
```

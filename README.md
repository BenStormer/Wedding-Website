# Aspen & Ben's Wedding Website

> **Live Site:** `https://www.aspenandbenjamin.com`

Source code for Aspen and Ben's wedding website — a full-stack web application for sharing wedding details, collecting RSVPs, and managing a gift registry.

<!-- TODO: Add screenshot/GIF of the homepage here -->

| Desktop                                                              | Mobile                                                             |
| -------------------------------------------------------------------- | ------------------------------------------------------------------ |
| ![Website Preview - Desktop](placeholder-for-desktop-screenshot.png) | ![Website Preview - Mobile](placeholder-for-mobile-screenshot.png) |

---

## Features

### Frontend

- Mobile-first responsive design
- Event timeline, venue details, and Nashville travel guide
- Countdown to the wedding date

### Backend

- **RSVP System** — Guests can RSVP by name; attendance is stored in Firestore
- **Gift Registry** — Browse registry items and mark gifts as purchased with quantity tracking

### Infrastructure

- **CDN & Caching** — Cloudflare Workers serve the static frontend with edge caching
- **DDoS Protection** — Cloudflare handles traffic filtering
- **Serverless Backend** — GCP Cloud Run scales to zero when idle

---

## Tech Stack

| Layer          | Technology                                             |
| -------------- | ------------------------------------------------------ |
| Frontend       | TypeScript, React, Mantine UI                          |
| Backend        | Go, net/http                                           |
| Database       | Google Cloud Firestore                                 |
| Hosting        | Cloudflare Workers (frontend), GCP Cloud Run (backend) |
| Infrastructure | Terraform                                              |

---

## Documentation

- **[Frontend README](./frontend/README.md)** — React app structure, pages, components, and local development
- **[Backend README](./backend/README.md)** — Go API structure, endpoints, and design decisions
- **[Infrastructure README](./infra/README.md)** — Cloud architecture, Terraform setup, and deployment

---

## Quick Start

```bash
# Frontend (from /frontend)
npm install
npm run dev

# Backend (from /backend)
# Start Firestore emulator first, then:
go run ./cmd/server/main.go

# Seed local database
go run ./cmd/server/main.go -seed
```

---

## CI/CD

GitHub Actions workflows handle continuous integration and deployment:

- **PR Checks** — Runs lint, build, and tests on pull requests (only for changed paths)
- **Backend Deployment** — Automatically deploys backend to Cloud Run on merges to `main`
- **Frontend Deployment** — Automatically deploys to Cloudflare Workers on merges to `main`

See individual READMEs for details.

---

## Project Structure

```
Wedding-Website/
├── frontend/          # React + TypeScript + Mantine
├── backend/           # Go REST API
├── infra/             # Terraform IaC
└── scripts/           # Data import/export utilities
```

# Wedding Website Infrastructure

Terraform configuration for deploying the wedding website backend to Google Cloud Platform.

---

## Architecture Overview

```
                                   ┌─────────────────────┐
                                   │     Cloudflare      │
                                   │   (DNS + CDN + WAF) │
                                   └──────────┬──────────┘
                                              │
                    ┌─────────────────────────┴─────────────────────────┐
                    │                                                   │
                    ▼                                                   ▼
         ┌─────────────────────┐                             ┌─────────────────────┐
         │  Cloudflare Worker  │                             │   GCP Cloud Run     │
         │  (Static Frontend)  │                             │   (Go Backend API)  │
         └─────────────────────┘                             └──────────┬──────────┘
                                                                        │
                                                                        ▼
                                                             ┌─────────────────────┐
                                                             │  Cloud Firestore    │
                                                             │    (Database)       │
                                                             └─────────────────────┘
```

### Components

| Component             | Purpose                                               |
| --------------------- | ----------------------------------------------------- |
| **Cloudflare**        | Custom domain DNS, DDoS protection, SSL termination   |
| **Cloudflare Worker** | Serves static frontend assets with edge caching       |
| **GCP Cloud Run**     | Serverless container hosting for the Go backend       |
| **Cloud Firestore**   | NoSQL document database for guests and registry items |
| **Artifact Registry** | Docker image storage for backend containers           |

---

## Why These Choices?

### Free Tier Coverage

The stack runs within free tiers (at the time of writing):

- **Cloudflare Workers** — 100,000 requests/day free
- **Cloud Run** — 2 million requests/month free, scales to zero when idle
- **Firestore** — 1 GB storage, 50K reads/day, 20K writes/day free
- **Artifact Registry** — 500 MB free storage

This website should stay well within free limits.

### Cloudflare

Cloudflare has been chosen for hosting the frontend since it provides:

- DDoS mitigation
- CDN caching and serving
- Bot detection
- Rate limiting at the edge
- SSL/TLS termination

### Cloud Run

Cloud Run has been chosen for hosting the backend since it provides:

- Traffic-based scaling
  - Allows hard-cap max instances
  - Scales to zero during idle periods, which is most times
- Automatic HTTPS and load balancing
- Health checks and automatic restarts

---

## Terraform Resources

### Managed by Terraform

| Resource                                 | Description                   |
| ---------------------------------------- | ----------------------------- |
| `google_project_service`                 | Enables required GCP APIs     |
| `google_artifact_registry_repository`    | Docker image storage          |
| `google_service_account`                 | Service account for Cloud Run |
| `google_firestore_database`              | Firestore database instance   |
| `google_cloud_run_v2_service`            | Backend API service           |
| `google_cloud_run_v2_service_iam_member` | Public access policy          |

### Not Managed by Terraform

- Cloudflare DNS records (managed via Cloudflare dashboard)
- Cloudflare Worker (deployed via Wrangler CLI from frontend/)
- Firestore data

---

## Deployment

### Prerequisites

- Terraform 1.5+
- `gcloud` CLI authenticated

### Initial Setup

1. Create a GCS bucket for Terraform state:

   ```bash
   gsutil mb gs://wedding-website-tfstate
   ```

2. Initialize Terraform:

   ```bash
   cd infra/
   terraform init
   ```

3. Review and apply:
   ```bash
   terraform plan
   terraform apply
   ```

### Deploying Backend Updates (Manual)

1. Build and push the Docker image:

   ```bash
   cd backend/
   make docker-build
   make docker-push
   ```

2. Update the `backend_image` variable and apply:
   ```bash
   terraform apply -var="backend_image=NEW_IMAGE_TAG"
   ```

### Deploying Backend Updates (Automated)

Backend deployment is automated via GitHub Actions. When changes are pushed to `main` in `backend/**` or `infra/**`:

1. Docker image is built and pushed to Artifact Registry
2. Terraform applies the new image to Cloud Run

Required GitHub secrets:

- `GCP_SA_KEY` — Service account JSON key with deployment permissions
- `GCP_PROJECT_ID` — GCP project ID

### Deploying Frontend Updates

Frontend deployment is automated via Cloudflare Pages on merges to `main`.

Manual deployment can be done via Wrangler:

```bash
cd frontend/
npm run deploy
```

---

## Configuration Variables

| Variable             | Description                 | Default       |
| -------------------- | --------------------------- | ------------- |
| `project_id`         | GCP project ID              | —             |
| `region`             | GCP region                  | `us-central1` |
| `firestore_location` | Firestore location          | `nam5`        |
| `backend_image`      | Docker image for Cloud Run  | —             |
| `min_instances`      | Minimum Cloud Run instances | `0`           |
| `max_instances`      | Maximum Cloud Run instances | `2`           |
| `cpu_limit`          | CPU limit per instance      | `1`           |
| `memory_limit`       | Memory limit per instance   | `512Mi`       |

---

## Cost Breakdown

| Service           | Expected Monthly Cost          |
| ----------------- | ------------------------------ |
| Cloud Run         | $0 (scales to zero, free tier) |
| Firestore         | $0 (under free tier limits)    |
| Artifact Registry | $0 (under 500 MB)              |
| Cloudflare        | $0 (free plan)                 |
| **Total**         | **$0**                         |

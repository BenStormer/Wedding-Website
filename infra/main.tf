# =============================================================================
# Wedding Website Infrastructure - Google Cloud Platform
# =============================================================================

terraform {
  required_version = ">= 1.5.0"

  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 5.0"
    }
    google-beta = {
      source  = "hashicorp/google-beta"
      version = "~> 5.0"
    }
  }

  # Remote state storage - uncomment when ready
  # backend "gcs" {
  #   bucket = "wedding-website-tfstate"
  #   prefix = "terraform/state"
  # }
}

# -----------------------------------------------------------------------------
# Providers
# -----------------------------------------------------------------------------

provider "google" {
  project = var.project_id
  region  = var.region
}

provider "google-beta" {
  project = var.project_id
  region  = var.region
}

# -----------------------------------------------------------------------------
# Enable Required APIs
# -----------------------------------------------------------------------------

resource "google_project_service" "required_apis" {
  for_each = toset([
    "run.googleapis.com",
    "firestore.googleapis.com",
    "artifactregistry.googleapis.com",
    "cloudbuild.googleapis.com",
    "secretmanager.googleapis.com",
    "iam.googleapis.com",
  ])

  project            = var.project_id
  service            = each.value
  disable_on_destroy = false
}

# -----------------------------------------------------------------------------
# Artifact Registry
# -----------------------------------------------------------------------------

resource "google_artifact_registry_repository" "backend" {
  location      = var.region
  repository_id = "wedding-backend"
  description   = "Docker repository for wedding website backend"
  format        = "DOCKER"

  cleanup_policies {
    id     = "keep-recent"
    action = "KEEP"
    most_recent_versions {
      keep_count = 10
    }
  }

  depends_on = [google_project_service.required_apis]
}

# -----------------------------------------------------------------------------
# Service Account for Cloud Run
# -----------------------------------------------------------------------------

resource "google_service_account" "cloud_run" {
  account_id   = "wedding-backend-sa"
  display_name = "Wedding Backend Service Account"
  description  = "Service account for the wedding website Cloud Run service"
}

resource "google_project_iam_member" "firestore_user" {
  project = var.project_id
  role    = "roles/datastore.user"
  member  = "serviceAccount:${google_service_account.cloud_run.email}"
}

# -----------------------------------------------------------------------------
# Firestore Database
# -----------------------------------------------------------------------------

resource "google_firestore_database" "main" {
  provider = google-beta

  project         = var.project_id
  name            = "(default)"
  location_id     = var.firestore_location
  type            = "FIRESTORE_NATIVE"
  deletion_policy = "DELETE"

  depends_on = [google_project_service.required_apis]
}

# -----------------------------------------------------------------------------
# Cloud Run Service
# -----------------------------------------------------------------------------

resource "google_cloud_run_v2_service" "backend" {
  name     = "wedding-website-api"
  location = var.region
  ingress  = "INGRESS_TRAFFIC_ALL"

  template {
    service_account = google_service_account.cloud_run.email

    scaling {
      min_instance_count = var.min_instances
      max_instance_count = var.max_instances
    }

    containers {
      image = var.backend_image

      ports {
        container_port = 8080
      }

      env {
        name  = "APP_ENV"
        value = "prod"
      }

      env {
        name  = "GCP_PROJECT_ID"
        value = var.project_id
      }

      resources {
        limits = {
          cpu    = var.cpu_limit
          memory = var.memory_limit
        }
        cpu_idle          = true
        startup_cpu_boost = true
      }

      startup_probe {
        http_get {
          path = "/v1/api/rsvp"
        }
        initial_delay_seconds = 0
        period_seconds        = 10
        timeout_seconds       = 3
        failure_threshold     = 3
      }
    }

    timeout = "30s"
  }

  traffic {
    type    = "TRAFFIC_TARGET_ALLOCATION_TYPE_LATEST"
    percent = 100
  }

  depends_on = [
    google_project_service.required_apis,
    google_firestore_database.main,
  ]

  lifecycle {
    ignore_changes = [
      template[0].containers[0].image,
      client,
      client_version,
    ]
  }
}

# Allow public access to Cloud Run
resource "google_cloud_run_v2_service_iam_member" "public_access" {
  project  = var.project_id
  location = var.region
  name     = google_cloud_run_v2_service.backend.name
  role     = "roles/run.invoker"
  member   = "allUsers"
}

# -----------------------------------------------------------------------------
# Outputs
# -----------------------------------------------------------------------------

output "cloud_run_url" {
  description = "The URL of the Cloud Run service"
  value       = google_cloud_run_v2_service.backend.uri
}

output "artifact_registry_url" {
  description = "The URL of the Artifact Registry repository"
  value       = "${var.region}-docker.pkg.dev/${var.project_id}/${google_artifact_registry_repository.backend.repository_id}"
}

output "service_account_email" {
  description = "The email of the Cloud Run service account"
  value       = google_service_account.cloud_run.email
}

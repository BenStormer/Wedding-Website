.PHONY: import-guests import-guests-dry-run

# Get current GCP project from gcloud config
GCP_PROJECT = $(shell gcloud config get-value project)

# Import guests from CSV to production Firestore
# Usage: make import-guests CSV=path/to/guests.csv
import-guests:
ifndef CSV
	$(error CSV is not set. Usage: make import-guests CSV=path/to/guests.csv)
endif
	@echo "Importing guests from ${CSV} to project ${GCP_PROJECT}..."
	cd import-guests && go run . -csv=${CSV} -project=${GCP_PROJECT}

# Dry run - preview what would be imported without actually importing
import-guests-dry-run:
ifndef CSV
	$(error CSV is not set. Usage: make import-guests-dry-run CSV=path/to/guests.csv)
endif
	@echo "DRY RUN - Previewing import from ${CSV}..."
	cd import-guests && go run . -csv=${CSV} -project=${GCP_PROJECT} -dry-run

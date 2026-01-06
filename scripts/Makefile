.PHONY: import-guests import-guests-dry-run import-registry import-registry-dry-run

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

# Import registry items from CSV to production Firestore
# Usage: make import-registry CSV=path/to/registry.csv
import-registry:
ifndef CSV
	$(error CSV is not set. Usage: make import-registry CSV=path/to/registry.csv)
endif
	@echo "Importing registry items from ${CSV} to project ${GCP_PROJECT}..."
	cd import-registry && go run . -csv=${CSV} -project=${GCP_PROJECT}

# Dry run - preview what would be imported without actually importing
import-registry-dry-run:
ifndef CSV
	$(error CSV is not set. Usage: make import-registry-dry-run CSV=path/to/registry.csv)
endif
	@echo "DRY RUN - Previewing import from ${CSV}..."
	cd import-registry && go run . -csv=${CSV} -project=${GCP_PROJECT} -dry-run

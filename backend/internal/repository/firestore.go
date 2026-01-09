package repository

import (
	"context"
	"strings"

	"cloud.google.com/go/firestore"
	"github.com/BenStormer/Wedding-Website/backend/internal/model"
	"golang.org/x/text/cases"
	"golang.org/x/text/language"
	"google.golang.org/api/iterator"
)

type FirestoreRsvpRepository struct {
	client    *firestore.Client
	ownsClient bool // true if this repository owns the client and should close it
}

// NewFirestoreRsvpRepositoryWithClient creates a new repository using a shared Firestore client.
func NewFirestoreRsvpRepositoryWithClient(client *firestore.Client) *FirestoreRsvpRepository {
	return &FirestoreRsvpRepository{client: client, ownsClient: false}
}

func (r *FirestoreRsvpRepository) FindGuest(firstName, lastName string) (*model.Guest, error) {
	ctx := context.Background()

	// Query for guest by first and last name (case-insensitive)
	caser := cases.Title(language.English)
	iter := r.client.Collection("guests").
		Where("FirstName", "==", caser.String(strings.ToLower(firstName))).
		Where("LastName", "==", caser.String(strings.ToLower(lastName))).
		Limit(1).
		Documents(ctx)

	doc, err := iter.Next()
	if err == iterator.Done {
		// No guest found
		return nil, nil
	}
	if err != nil {
		return nil, err
	}

	var guest model.Guest
	if err := doc.DataTo(&guest); err != nil {
		return nil, err
	}
	guest.ID = doc.Ref.ID

	return &guest, nil
}

func (r *FirestoreRsvpRepository) UpdateRsvp(id string, request *model.RsvpRequest) (*model.Guest, error) {
	ctx := context.Background()

	docRef := r.client.Collection("guests").Doc(id)

	// Build update list - only update optional fields if new values are provided
	// This prevents overwriting existing email/phone with empty values
	updates := []firestore.Update{
		{Path: "Attending", Value: request.Attending},
	}

	// Only update email if a new value is provided
	if request.Email != "" {
		updates = append(updates, firestore.Update{Path: "Email", Value: request.Email})
	}

	// Only update phone if a new value is provided
	if request.Phone != "" {
		updates = append(updates, firestore.Update{Path: "Phone", Value: request.Phone})
	}

	// Update the guest document
	_, err := docRef.Update(ctx, updates)
	if err != nil {
		return nil, err
	}

	// Fetch the updated document
	doc, err := docRef.Get(ctx)
	if err != nil {
		return nil, err
	}

	var guest model.Guest
	if err := doc.DataTo(&guest); err != nil {
		return nil, err
	}
	guest.ID = doc.Ref.ID

	return &guest, nil
}

func (r *FirestoreRsvpRepository) Close() error {
	// Only close the client if this repository owns it
	if r.ownsClient {
		return r.client.Close()
	}
	return nil
}


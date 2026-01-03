package repository

import (
	"context"
	"time"

	"cloud.google.com/go/firestore"
	"github.com/BenStormer/Wedding-Website/backend/internal/config"
	"github.com/BenStormer/Wedding-Website/backend/internal/model"
	"google.golang.org/api/iterator"
)

type FirestoreRegistryRepository struct {
	client *firestore.Client
}

func NewFirestoreRegistryRepository(cfg *config.Config, client *firestore.Client) *FirestoreRegistryRepository {
	return &FirestoreRegistryRepository{client: client}
}

func (r *FirestoreRegistryRepository) GetAllItems() ([]model.RegistryItem, error) {
	ctx := context.Background()

	iter := r.client.Collection("registry_items").Documents(ctx)
	defer iter.Stop()

	var items []model.RegistryItem
	for {
		doc, err := iter.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return nil, err
		}

		var item model.RegistryItem
		if err := doc.DataTo(&item); err != nil {
			return nil, err
		}
		item.ID = doc.Ref.ID
		items = append(items, item)
	}

	return items, nil
}

func (r *FirestoreRegistryRepository) FindItemByLabel(label string) (*model.RegistryItem, error) {
	ctx := context.Background()

	// Query for registry item by label
	iter := r.client.Collection("registry_items").
		Where("label", "==", label).
		Limit(1).
		Documents(ctx)

	doc, err := iter.Next()
	if err == iterator.Done {
		// No item found
		return nil, nil
	}
	if err != nil {
		return nil, err
	}

	var item model.RegistryItem
	if err := doc.DataTo(&item); err != nil {
		return nil, err
	}
	item.ID = doc.Ref.ID

	return &item, nil
}

func (r *FirestoreRegistryRepository) RecordGift(gift *model.GiftRecord) error {
	ctx := context.Background()

	// Set creation timestamp
	now := time.Now()
	gift.CreatedAt = &now

	// Add to gifts collection
	_, _, err := r.client.Collection("gifts").Add(ctx, gift)
	return err
}

func (r *FirestoreRegistryRepository) UpdateItemReceivedQuantity(itemID string, newQuantity int) error {
	ctx := context.Background()

	docRef := r.client.Collection("registry_items").Doc(itemID)

	_, err := docRef.Update(ctx, []firestore.Update{
		{Path: "received_quantity", Value: newQuantity},
	})

	return err
}

func (r *FirestoreRegistryRepository) Close() error {
	return r.client.Close()
}

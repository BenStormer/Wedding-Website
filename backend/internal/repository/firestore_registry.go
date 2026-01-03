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

// RecordGiftWithValidation atomically validates availability and records the gift using a Firestore transaction.
// This prevents race conditions where two users could over-gift an item.
func (r *FirestoreRegistryRepository) RecordGiftWithValidation(gift *model.GiftRecord, requestedQuantity int) (*model.RegistryItem, error) {
	ctx := context.Background()

	var resultItem *model.RegistryItem

	err := r.client.RunTransaction(ctx, func(ctx context.Context, tx *firestore.Transaction) error {
		// Find the item by label within the transaction
		iter := r.client.Collection("registry_items").
			Where("label", "==", gift.ItemLabel).
			Limit(1).
			Documents(ctx)

		doc, err := iter.Next()
		if err == iterator.Done {
			return &GiftValidationError{
				Code:    "not_found",
				Message: "Registry item not found",
			}
		}
		if err != nil {
			return err
		}

		var item model.RegistryItem
		if err := doc.DataTo(&item); err != nil {
			return err
		}
		item.ID = doc.Ref.ID

		// For non-special funds, validate quantity
		if !gift.IsSpecialFund && item.RequestedQuantity != nil {
			remaining := *item.RequestedQuantity - item.ReceivedQuantity

			if remaining <= 0 {
				return &GiftValidationError{
					Code:    "fully_gifted",
					Message: "This item has already been fully gifted",
				}
			}

			if requestedQuantity > remaining {
				return &GiftValidationError{
					Code:    "quantity_exceeded",
					Message: "Requested quantity exceeds remaining needed",
				}
			}

			// Update the received quantity within the transaction
			newQuantity := item.ReceivedQuantity + requestedQuantity
			if err := tx.Update(doc.Ref, []firestore.Update{
				{Path: "received_quantity", Value: newQuantity},
			}); err != nil {
				return err
			}

			item.ReceivedQuantity = newQuantity
		}

		// Set creation timestamp
		now := time.Now()
		gift.CreatedAt = &now

		// Add the gift record within the transaction
		giftRef := r.client.Collection("gifts").NewDoc()
		if err := tx.Set(giftRef, gift); err != nil {
			return err
		}

		resultItem = &item
		return nil
	})

	if err != nil {
		return nil, err
	}

	return resultItem, nil
}

func (r *FirestoreRegistryRepository) Close() error {
	return r.client.Close()
}

package repository

import (
	"context"
	"log"
	"sync"
	"time"

	"cloud.google.com/go/firestore"
	"github.com/BenStormer/Wedding-Website/backend/internal/config"
	"github.com/BenStormer/Wedding-Website/backend/internal/model"
	"google.golang.org/api/iterator"
)

type FirestoreRegistryRepository struct {
	client *firestore.Client
	
	// In-memory cache for registry items
	cache      []model.RegistryItem
	cacheMu    sync.RWMutex
	cacheTime  time.Time
	cacheTTL   time.Duration
}

func NewFirestoreRegistryRepository(cfg *config.Config, client *firestore.Client) *FirestoreRegistryRepository {
	return &FirestoreRegistryRepository{
		client:   client,
		cacheTTL: 30 * time.Second, // Cache items for 30 seconds
	}
}

func (r *FirestoreRegistryRepository) GetAllItems() ([]model.RegistryItem, error) {
	// Check cache first
	r.cacheMu.RLock()
	if r.cache != nil && time.Since(r.cacheTime) < r.cacheTTL {
		items := make([]model.RegistryItem, len(r.cache))
		copy(items, r.cache)
		r.cacheMu.RUnlock()
		return items, nil
	}
	r.cacheMu.RUnlock()

	// Cache miss - fetch from Firestore using GetAll for batch fetching
	ctx := context.Background()

	// Use GetAll() instead of iterating - this is more efficient as it fetches all documents in a single RPC
	docs, err := r.client.Collection("registry_items").Documents(ctx).GetAll()
	if err != nil {
		return nil, err
	}

	items := make([]model.RegistryItem, 0, len(docs))
	for _, doc := range docs {
		var item model.RegistryItem
		if err := doc.DataTo(&item); err != nil {
			log.Printf("Warning: failed to parse registry item %s: %v", doc.Ref.ID, err)
			continue
		}
		item.ID = doc.Ref.ID
		items = append(items, item)
	}

	// Update cache
	r.cacheMu.Lock()
	r.cache = make([]model.RegistryItem, len(items))
	copy(r.cache, items)
	r.cacheTime = time.Now()
	r.cacheMu.Unlock()

	return items, nil
}

func (r *FirestoreRegistryRepository) invalidateCache() {
	r.cacheMu.Lock()
	r.cache = nil
	r.cacheMu.Unlock()
}
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

		// For items with a requested quantity, validate availability
		if item.RequestedQuantity != nil {
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

	r.invalidateCache()

	return resultItem, nil
}

func (r *FirestoreRegistryRepository) Close() error {
	return r.client.Close()
}

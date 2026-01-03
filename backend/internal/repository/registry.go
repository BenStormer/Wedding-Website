package repository

import "github.com/BenStormer/Wedding-Website/backend/internal/model"

// Interface for querying the database directly for Registry items
type RegistryRepository interface {
	GetAllItems() ([]model.RegistryItem, error)
	FindItemByLabel(label string) (*model.RegistryItem, error)
	RecordGift(gift *model.GiftRecord) error
	UpdateItemReceivedQuantity(itemID string, newQuantity int) error
}

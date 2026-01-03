package repository

import "github.com/BenStormer/Wedding-Website/backend/internal/model"

// GiftValidationError represents a validation error during gift recording
type GiftValidationError struct {
	Code    string // "not_found", "fully_gifted", "quantity_exceeded"
	Message string
}

func (e *GiftValidationError) Error() string {
	return e.Message
}

// Interface for querying the database directly for Registry items
type RegistryRepository interface {
	GetAllItems() ([]model.RegistryItem, error)
	FindItemByLabel(label string) (*model.RegistryItem, error)
	RecordGift(gift *model.GiftRecord) error
	UpdateItemReceivedQuantity(itemID string, newQuantity int) error
	// RecordGiftWithValidation atomically validates availability and records the gift
	// Returns GiftValidationError if validation fails, other error for system failures
	RecordGiftWithValidation(gift *model.GiftRecord, requestedQuantity int) (*model.RegistryItem, error)
}

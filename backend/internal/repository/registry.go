package repository

import "github.com/BenStormer/Wedding-Website/backend/internal/model"

type GiftValidationError struct {
	Code    string
	Message string
}

func (e *GiftValidationError) Error() string {
	return e.Message
}

type RegistryRepository interface {
	GetAllItems() ([]model.RegistryItem, error)
	RecordGiftWithValidation(gift *model.GiftRecord, requestedQuantity int) (*model.RegistryItem, error)
}

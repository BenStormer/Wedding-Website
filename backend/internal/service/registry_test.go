package service

import (
	"errors"
	"testing"

	"github.com/BenStormer/Wedding-Website/backend/internal/model"
	"github.com/BenStormer/Wedding-Website/backend/internal/repository"
)

// Helper function to create a pointer to an int
func intPtr(i int) *int {
	return &i
}

type MockRegistryRepository struct {
	GetAllItemsResult              []model.RegistryItem
	GetAllItemsError               error
	RecordGiftWithValidationResult *model.RegistryItem
	RecordGiftWithValidationError  error
	RecordGiftCalled               bool
	QuantityValue                  int
}

func (m *MockRegistryRepository) GetAllItems() ([]model.RegistryItem, error) {
	return m.GetAllItemsResult, m.GetAllItemsError
}

func (m *MockRegistryRepository) RecordGiftWithValidation(gift *model.GiftRecord, requestedQuantity int) (*model.RegistryItem, error) {
	m.RecordGiftCalled = true
	m.QuantityValue = requestedQuantity
	return m.RecordGiftWithValidationResult, m.RecordGiftWithValidationError
}

func TestRecordGift_ItemNotFound(t *testing.T) {
	mockRepo := &MockRegistryRepository{
		RecordGiftWithValidationError: &repository.GiftValidationError{
			Code:    "not_found",
			Message: "Registry item not found",
		},
	}
	service := NewRegistryService(mockRepo)

	request := model.GiftRequest{
		FirstName: "John",
		LastName:  "Doe",
		ItemLabel: "Unknown Item",
		Quantity:  1,
	}

	response, err := service.RecordGift(request)

	if err == nil {
		t.Errorf("Expected error when item not found, got nil")
	}
	if !errors.Is(err, ErrItemNotFound) {
		t.Errorf("Expected ErrItemNotFound, got %v", err)
	}
	if response.Success != false {
		t.Errorf("Expected unsuccessful response")
	}
}

func TestRecordGift_Success(t *testing.T) {
	mockRepo := &MockRegistryRepository{
		RecordGiftWithValidationResult: &model.RegistryItem{
			ID:                "kitchenaid-mixer",
			Label:             "KitchenAid Stand Mixer",
			RequestedQuantity: intPtr(1),
			ReceivedQuantity:  1,
		},
	}
	service := NewRegistryService(mockRepo)

	request := model.GiftRequest{
		FirstName: "John",
		LastName:  "Doe",
		ItemLabel: "KitchenAid Stand Mixer",
		Quantity:  1,
	}

	response, err := service.RecordGift(request)

	if err != nil {
		t.Errorf("Expected successful submission, got %v", err)
	}
	if response.Success != true {
		t.Errorf("Expected successful response")
	}
	if !mockRepo.RecordGiftCalled {
		t.Errorf("Expected RecordGiftWithValidation to be called")
	}
	if mockRepo.QuantityValue != 1 {
		t.Errorf("Expected quantity to be 1, got %d", mockRepo.QuantityValue)
	}
}

func TestRecordGift_ItemWithoutQuantity(t *testing.T) {
	mockRepo := &MockRegistryRepository{
		RecordGiftWithValidationResult: &model.RegistryItem{
			ID:                "family-recipes",
			Label:             "Family Recipes",
			RequestedQuantity: nil,
			ReceivedQuantity:  0,
		},
	}
	service := NewRegistryService(mockRepo)

	request := model.GiftRequest{
		FirstName: "Jane",
		LastName:  "Smith",
		ItemLabel: "Family Recipes",
		Quantity:  1,
	}

	response, err := service.RecordGift(request)

	if err != nil {
		t.Errorf("Expected successful submission, got %v", err)
	}
	if response.Success != true {
		t.Errorf("Expected successful response")
	}
	if !mockRepo.RecordGiftCalled {
		t.Errorf("Expected RecordGiftWithValidation to be called")
	}
}

func TestRecordGift_ItemFullyGifted(t *testing.T) {
	mockRepo := &MockRegistryRepository{
		RecordGiftWithValidationError: &repository.GiftValidationError{
			Code:    "fully_gifted",
			Message: "This item has already been fully gifted",
		},
	}
	service := NewRegistryService(mockRepo)

	request := model.GiftRequest{
		FirstName: "John",
		LastName:  "Doe",
		ItemLabel: "KitchenAid Stand Mixer",
		Quantity:  1,
	}

	response, err := service.RecordGift(request)

	if err == nil {
		t.Errorf("Expected error when item fully gifted, got nil")
	}
	if !errors.Is(err, ErrItemFullyGifted) {
		t.Errorf("Expected ErrItemFullyGifted, got %v", err)
	}
	if response.Success != false {
		t.Errorf("Expected unsuccessful response")
	}
}

func TestRecordGift_QuantityExceedsRemaining(t *testing.T) {
	mockRepo := &MockRegistryRepository{
		RecordGiftWithValidationError: &repository.GiftValidationError{
			Code:    "quantity_exceeded",
			Message: "Requested quantity exceeds remaining needed",
		},
	}
	service := NewRegistryService(mockRepo)

	request := model.GiftRequest{
		FirstName: "John",
		LastName:  "Doe",
		ItemLabel: "Luxury Bath Towel Set",
		Quantity:  2, // Trying to gift 2, but only 1 remaining
	}

	response, err := service.RecordGift(request)

	if err == nil {
		t.Errorf("Expected error when quantity exceeds remaining, got nil")
	}
	if !errors.Is(err, ErrQuantityExceedsRemaining) {
		t.Errorf("Expected ErrQuantityExceedsRemaining, got %v", err)
	}
	if response.Success != false {
		t.Errorf("Expected unsuccessful response")
	}
}

func TestRecordGift_MultipleQuantity(t *testing.T) {
	mockRepo := &MockRegistryRepository{
		RecordGiftWithValidationResult: &model.RegistryItem{
			ID:                "towel-set",
			Label:             "Luxury Bath Towel Set",
			RequestedQuantity: intPtr(3),
			ReceivedQuantity:  2,
		},
	}
	service := NewRegistryService(mockRepo)

	request := model.GiftRequest{
		FirstName: "John",
		LastName:  "Doe",
		ItemLabel: "Luxury Bath Towel Set",
		Quantity:  2,
	}

	response, err := service.RecordGift(request)

	if err != nil {
		t.Errorf("Expected successful submission, got %v", err)
	}
	if response.Success != true {
		t.Errorf("Expected successful response")
	}
	if mockRepo.QuantityValue != 2 {
		t.Errorf("Expected quantity to be 2, got %d", mockRepo.QuantityValue)
	}
}

func TestRecordGift_SystemError(t *testing.T) {
	mockRepo := &MockRegistryRepository{
		RecordGiftWithValidationError: errors.New("database connection failed"),
	}
	service := NewRegistryService(mockRepo)

	request := model.GiftRequest{
		FirstName: "John",
		LastName:  "Doe",
		ItemLabel: "KitchenAid Stand Mixer",
		Quantity:  1,
	}

	response, err := service.RecordGift(request)

	if err == nil {
		t.Errorf("Expected error when system fails, got nil")
	}
	if response.Success != false {
		t.Errorf("Expected unsuccessful response")
	}
	if response.Message != "Failed to record your gift" {
		t.Errorf("Expected 'Failed to record your gift' message, got '%s'", response.Message)
	}
}

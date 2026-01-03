package service

import (
	"errors"
	"testing"

	"github.com/BenStormer/Wedding-Website/backend/internal/model"
)

// Helper function to create a pointer to an int
func intPtr(i int) *int {
	return &i
}

type MockRegistryRepository struct {
	GetAllItemsResult []model.RegistryItem
	GetAllItemsError  error

	FindItemResult *model.RegistryItem
	FindItemError  error

	RecordGiftError  error
	RecordGiftCalled bool

	UpdateQuantityError  error
	UpdateQuantityCalled bool
	UpdateQuantityValue  int
}

func (m *MockRegistryRepository) GetAllItems() ([]model.RegistryItem, error) {
	return m.GetAllItemsResult, m.GetAllItemsError
}

func (m *MockRegistryRepository) FindItemByLabel(label string) (*model.RegistryItem, error) {
	return m.FindItemResult, m.FindItemError
}

func (m *MockRegistryRepository) RecordGift(gift *model.GiftRecord) error {
	m.RecordGiftCalled = true
	return m.RecordGiftError
}

func (m *MockRegistryRepository) UpdateItemReceivedQuantity(itemID string, newQuantity int) error {
	m.UpdateQuantityCalled = true
	m.UpdateQuantityValue = newQuantity
	return m.UpdateQuantityError
}

func TestRecordGift_ItemNotFound(t *testing.T) {
	mockRepo := &MockRegistryRepository{
		FindItemResult: nil,
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
		FindItemResult: &model.RegistryItem{
			ID:                "kitchenaid-mixer",
			Label:             "KitchenAid Stand Mixer",
			RequestedQuantity: intPtr(1),
			ReceivedQuantity:  0,
			IsSpecialFund:     false,
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
		t.Errorf("Expected RecordGift to be called")
	}
	if !mockRepo.UpdateQuantityCalled {
		t.Errorf("Expected UpdateItemReceivedQuantity to be called")
	}
	if mockRepo.UpdateQuantityValue != 1 {
		t.Errorf("Expected quantity to be updated to 1, got %d", mockRepo.UpdateQuantityValue)
	}
}

func TestRecordGift_SpecialFund(t *testing.T) {
	mockRepo := &MockRegistryRepository{
		FindItemResult: &model.RegistryItem{
			ID:                "honeymoon-fund",
			Label:             "Honeymoon Fund",
			RequestedQuantity: nil, // unlimited
			ReceivedQuantity:  0,
			IsSpecialFund:     true,
		},
	}
	service := NewRegistryService(mockRepo)

	request := model.GiftRequest{
		FirstName:     "Jane",
		LastName:      "Smith",
		ItemLabel:     "Honeymoon Fund",
		Quantity:      1,
		IsSpecialFund: true,
	}

	response, err := service.RecordGift(request)

	if err != nil {
		t.Errorf("Expected successful submission, got %v", err)
	}
	if response.Success != true {
		t.Errorf("Expected successful response")
	}
	if !mockRepo.RecordGiftCalled {
		t.Errorf("Expected RecordGift to be called")
	}
	// Special funds should NOT update quantity
	if mockRepo.UpdateQuantityCalled {
		t.Errorf("Expected UpdateItemReceivedQuantity to NOT be called for special fund")
	}
}

func TestRecordGift_ItemFullyGifted(t *testing.T) {
	mockRepo := &MockRegistryRepository{
		FindItemResult: &model.RegistryItem{
			ID:                "kitchenaid-mixer",
			Label:             "KitchenAid Stand Mixer",
			RequestedQuantity: intPtr(1),
			ReceivedQuantity:  1, // Already fully gifted
			IsSpecialFund:     false,
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
		FindItemResult: &model.RegistryItem{
			ID:                "towel-set",
			Label:             "Luxury Bath Towel Set",
			RequestedQuantity: intPtr(2),
			ReceivedQuantity:  1, // Only 1 remaining
			IsSpecialFund:     false,
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
		FindItemResult: &model.RegistryItem{
			ID:                "towel-set",
			Label:             "Luxury Bath Towel Set",
			RequestedQuantity: intPtr(3),
			ReceivedQuantity:  0,
			IsSpecialFund:     false,
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
	if mockRepo.UpdateQuantityValue != 2 {
		t.Errorf("Expected quantity to be updated to 2, got %d", mockRepo.UpdateQuantityValue)
	}
}

func TestRecordGift_RecordGiftError(t *testing.T) {
	mockRepo := &MockRegistryRepository{
		FindItemResult: &model.RegistryItem{
			ID:                "kitchenaid-mixer",
			Label:             "KitchenAid Stand Mixer",
			RequestedQuantity: intPtr(1),
			ReceivedQuantity:  0,
			IsSpecialFund:     false,
		},
		RecordGiftError: errors.New("database error"),
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
		t.Errorf("Expected error when RecordGift fails, got nil")
	}
	if response.Success != false {
		t.Errorf("Expected unsuccessful response")
	}
}

func TestRecordGift_FindItemError(t *testing.T) {
	mockRepo := &MockRegistryRepository{
		FindItemError: errors.New("database connection error"),
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
		t.Errorf("Expected error when FindItemByLabel fails, got nil")
	}
	if response.Success != false {
		t.Errorf("Expected unsuccessful response")
	}
}

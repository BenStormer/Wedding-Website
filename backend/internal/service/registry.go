package service

import (
	"errors"
	"fmt"

	"github.com/BenStormer/Wedding-Website/backend/internal/model"
	"github.com/BenStormer/Wedding-Website/backend/internal/repository"
)

var ErrItemNotFound = errors.New("registry item not found")
var ErrItemFullyGifted = errors.New("item has already been fully gifted")
var ErrQuantityExceedsRemaining = errors.New("quantity exceeds remaining needed")

type RegistryService struct {
	repo repository.RegistryRepository
}

const DefaultPlaceholderImage = "https://placehold.co/800x600/e8ddd4/5e4838?text=Gift"

func NewRegistryService(repo repository.RegistryRepository) *RegistryService {
	return &RegistryService{
		repo: repo,
	}
}

func (s *RegistryService) GetAllItems() (*model.RegistryItemsResponse, error) {
	items, err := s.repo.GetAllItems()
	if err != nil {
		return &model.RegistryItemsResponse{
			Success: false,
			Error:   err.Error(),
		}, err
	}

	// Convert to response format and apply placeholder image if needed
	responseItems := make([]model.RegistryItemResponse, len(items))
	for i, item := range items {
		image := item.Image
		if image == "" {
			image = DefaultPlaceholderImage
		}

		responseItems[i] = model.RegistryItemResponse{
			ID:                item.ID,
			Label:             item.Label,
			Description:       item.Description,
			Price:             item.Price,
			Image:             image,
			Alt:               item.Alt,
			RequestedQuantity: item.RequestedQuantity,
			ReceivedQuantity:  item.ReceivedQuantity,
			PurchaseLink:      item.PurchaseLink,
		}
	}

	return &model.RegistryItemsResponse{
		Success: true,
		Items:   responseItems,
	}, nil
}

func (s *RegistryService) RecordGift(request model.GiftRequest) (*model.GiftResponse, error) {
	// Create gift record
	giftRecord := &model.GiftRecord{
		ItemLabel: request.ItemLabel,
		FirstName: request.FirstName,
		LastName:  request.LastName,
		Email:     request.Email,
		Quantity:  request.Quantity,
	}

	// Use transactional method to atomically validate and record the gift
	// This prevents race conditions where two users could over-gift an item
	item, err := s.repo.RecordGiftWithValidation(giftRecord, request.Quantity)
	if err != nil {
		// Check if it's a validation error
		if validationErr, ok := err.(*repository.GiftValidationError); ok {
			switch validationErr.Code {
			case "not_found":
				return &model.GiftResponse{
					Success: false,
					Message: fmt.Sprintf("Registry item '%s' was not found", request.ItemLabel),
					Error:   ErrItemNotFound.Error(),
				}, ErrItemNotFound
			case "fully_gifted":
				return &model.GiftResponse{
					Success: false,
					Message: fmt.Sprintf("Thank you, but '%s' has already been fully gifted!", request.ItemLabel),
					Error:   ErrItemFullyGifted.Error(),
				}, ErrItemFullyGifted
			case "quantity_exceeded":
				return &model.GiftResponse{
					Success: false,
					Message: fmt.Sprintf("The requested quantity exceeds what's still needed for '%s'. Please try a smaller amount.", request.ItemLabel),
					Error:   ErrQuantityExceedsRemaining.Error(),
				}, ErrQuantityExceedsRemaining
			}
		}

		// System error
		return &model.GiftResponse{
			Success: false,
			Message: "Failed to record your gift",
			Error:   err.Error(),
		}, err
	}

	// Build success message
	message := fmt.Sprintf("Thank you, %s %s, for gifting us %s!",
		request.FirstName, request.LastName, item.Label)

	return &model.GiftResponse{
		Success: true,
		Message: message,
	}, nil
}

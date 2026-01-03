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
			IsSpecialFund:     item.IsSpecialFund,
		}
	}

	return &model.RegistryItemsResponse{
		Success: true,
		Items:   responseItems,
	}, nil
}

func (s *RegistryService) RecordGift(request model.GiftRequest) (*model.GiftResponse, error) {
	// Find the registry item by label
	item, err := s.repo.FindItemByLabel(request.ItemLabel)
	if err != nil {
		return &model.GiftResponse{
			Success: false,
			Message: "An error occurred while looking up the registry item",
			Error:   err.Error(),
		}, err
	}
	if item == nil {
		return &model.GiftResponse{
			Success: false,
			Message: fmt.Sprintf("Registry item '%s' was not found", request.ItemLabel),
			Error:   ErrItemNotFound.Error(),
		}, ErrItemNotFound
	}

	// For non-special funds, check if item is already fully gifted
	if !item.IsSpecialFund && item.RequestedQuantity != nil {
		remaining := *item.RequestedQuantity - item.ReceivedQuantity
		if remaining <= 0 {
			return &model.GiftResponse{
				Success: false,
				Message: fmt.Sprintf("Thank you, but '%s' has already been fully gifted!", item.Label),
				Error:   ErrItemFullyGifted.Error(),
			}, ErrItemFullyGifted
		}

		// Check if requested quantity exceeds remaining
		if request.Quantity > remaining {
			return &model.GiftResponse{
				Success: false,
				Message: fmt.Sprintf("Only %d more of '%s' needed. Please adjust your quantity.", remaining, item.Label),
				Error:   ErrQuantityExceedsRemaining.Error(),
			}, ErrQuantityExceedsRemaining
		}
	}

	// Create gift record
	giftRecord := &model.GiftRecord{
		ItemLabel:     request.ItemLabel,
		FirstName:     request.FirstName,
		LastName:      request.LastName,
		Email:         request.Email,
		Quantity:      request.Quantity,
		IsSpecialFund: request.IsSpecialFund,
	}

	// Record the gift
	if err := s.repo.RecordGift(giftRecord); err != nil {
		return &model.GiftResponse{
			Success: false,
			Message: "Failed to record your gift",
			Error:   err.Error(),
		}, err
	}

	// Update the received quantity on the registry item (for non-special funds)
	if !item.IsSpecialFund {
		newQuantity := item.ReceivedQuantity + request.Quantity
		if err := s.repo.UpdateItemReceivedQuantity(item.ID, newQuantity); err != nil {
			// Gift was recorded but quantity update failed - log but don't fail the request
			// The gift record is the source of truth
			fmt.Printf("Warning: Failed to update received quantity for item %s: %v\n", item.ID, err)
		}
	}

	// Build success message
	var message string
	if request.IsSpecialFund {
		message = fmt.Sprintf("Thank you, %s %s, for your generous contribution to our %s!", 
			request.FirstName, request.LastName, item.Label)
	} else {
		message = fmt.Sprintf("Thank you, %s %s, for gifting us %s!", 
			request.FirstName, request.LastName, item.Label)
	}

	return &model.GiftResponse{
		Success: true,
		Message: message,
	}, nil
}

package api

import (
	"encoding/json"
	"errors"
	"log"
	"net/http"

	"github.com/BenStormer/Wedding-Website/backend/internal/model"
	"github.com/BenStormer/Wedding-Website/backend/internal/service"
	"github.com/BenStormer/Wedding-Website/backend/internal/util"
)

type RegistryServiceInterface interface {
	GetAllItems() (*model.RegistryItemsResponse, error)
	RecordGift(request model.GiftRequest) (*model.GiftResponse, error)
}

type RegistryHandler struct {
	service RegistryServiceInterface
}

func NewRegistryHandler(service RegistryServiceInterface) *RegistryHandler {
	return &RegistryHandler{
		service: service,
	}
}

func (h *RegistryHandler) HandleGetItems(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	// Note: CORS headers and OPTIONS handling are done by the middleware

	// Validate HTTP method - only accept GET
	if r.Method != http.MethodGet {
		w.WriteHeader(http.StatusMethodNotAllowed)
		json.NewEncoder(w).Encode(model.RegistryItemsResponse{
			Success: false,
			Error:   "Method not allowed",
		})
		return
	}

	// Call service to get all items
	response, err := h.service.GetAllItems()
	if err != nil {
		log.Printf("Error fetching registry items: %v", err)
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(response)
		return
	}

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(response)
}

func (h *RegistryHandler) HandleGift(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	// Note: CORS headers and OPTIONS handling are done by the middleware

	// Validate HTTP method - only accept POST
	if r.Method != http.MethodPost {
		w.WriteHeader(http.StatusMethodNotAllowed)
		json.NewEncoder(w).Encode(model.GiftResponse{
			Success: false,
			Message: "Method not allowed",
		})
		return
	}

	// Validate body is valid JSON
	var request model.GiftRequest
	err := json.NewDecoder(r.Body).Decode(&request)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(model.GiftResponse{
			Success: false,
			Message: "Invalid JSON syntax",
		})
		return
	}

	// Validate required body parameters
	if request.FirstName == "" || request.LastName == "" {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(model.GiftResponse{
			Success: false,
			Message: "First name and last name are required",
		})
		return
	}
	if request.ItemLabel == "" {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(model.GiftResponse{
			Success: false,
			Message: "Item label is required",
		})
		return
	}
	if request.Quantity < 1 && !request.IsSpecialFund {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(model.GiftResponse{
			Success: false,
			Message: "Quantity must be at least 1",
		})
		return
	}

	// For special funds, set quantity to 1 if not provided
	if request.IsSpecialFund && request.Quantity < 1 {
		request.Quantity = 1
	}

	// Normalize input data to consistent format
	request.FirstName = util.NormalizeName(request.FirstName)
	request.LastName = util.NormalizeName(request.LastName)
	request.Email = util.NormalizeEmail(request.Email)

	// Call service to record the gift
	response, err := h.service.RecordGift(request)
	if err != nil {
		log.Printf("Error recording gift from %s %s for %s: %v", request.FirstName, request.LastName, request.ItemLabel, err)
		if errors.Is(err, service.ErrItemNotFound) {
			w.WriteHeader(http.StatusNotFound)
		} else if errors.Is(err, service.ErrItemFullyGifted) || errors.Is(err, service.ErrQuantityExceedsRemaining) {
			w.WriteHeader(http.StatusBadRequest)
		} else {
			w.WriteHeader(http.StatusInternalServerError)
		}
		json.NewEncoder(w).Encode(response)
		return
	}

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(response)
}

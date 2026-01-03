package api

import (
	"encoding/json"
	"errors"
	"net/http"

	"github.com/BenStormer/Wedding-Website/backend/internal/model"
	"github.com/BenStormer/Wedding-Website/backend/internal/service"
)

type RsvpServiceInterface interface {
	SubmitRsvp(request model.RsvpRequest) (*model.RsvpResponse, error)
}

type RsvpHandler struct {
	service RsvpServiceInterface
}

func NewRsvpHandler(service RsvpServiceInterface) *RsvpHandler {
	return &RsvpHandler{
		service: service,
	}
}

func (h *RsvpHandler) HandleRsvp(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	// Validate HTTP method (OPTIONS is handled by middleware)
	if r.Method != http.MethodPost {
		w.WriteHeader(http.StatusMethodNotAllowed)
		json.NewEncoder(w).Encode(model.RsvpResponse{
			Success: false,
			Message: "Method not allowed",
		})
		return
	}

	// Validate body is valid JSON
	var request model.RsvpRequest
	err := json.NewDecoder(r.Body).Decode(&request)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(model.RsvpResponse{
			Success: false,
			Message: "Invalid JSON syntax",
		})
		return
	}

	// Validate body parameters
	if request.FirstName == "" || request.LastName == "" {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(model.RsvpResponse{
			Success: false,
			Message: "First name and last name are required",
		})
		return
	}
	if request.Attending == nil {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(model.RsvpResponse{
			Success: false,
			Message: "Attending field is required",
		})
		return
	}

	// Call service to submit Rsvp
	response, err := h.service.SubmitRsvp(request)
	if err != nil {
		if errors.Is(err, service.ErrGuestNotFound) {
			w.WriteHeader(http.StatusNotFound)
		} else {
			w.WriteHeader(http.StatusInternalServerError)
		}
		json.NewEncoder(w).Encode(response)
		return
	}

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(response)
}

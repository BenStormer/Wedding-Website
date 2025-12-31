package repository

import "github.com/BenStormer/Wedding-Website/backend/internal/model"

/*
Interface for querying the database directly for Rsvps
*/
type RsvpRepository interface {
	FindGuest(firstName, lastName string) (*model.Guest, error)
	UpdateRsvp(id string, request *model.RsvpRequest) (*model.Guest, error)
}
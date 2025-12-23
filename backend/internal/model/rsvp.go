package model

import "time"

// Database model for an RSVP entry
type Guest struct {
	ID        string
	FirstName string
	LastName  string
	Email     string
	Phone     string
	Attending *bool
	UpdatedAt *time.Time
}

// API request model for an RSVP entry
type RSVPRequest struct {
	FirstName  string `json:"firstname"`
	LastName   string `json:"lastname"`
	Email      string `json:"email,omitempty"`
	Phone      string `json:"phone,omitempty"`
	Attending  bool   `json:"attending"`
}

// API response model after updating an RSVP
type RSVPStatus struct {
	Guest *Guest
	PreviousStatus *bool
	StatusChanged bool
}

// API response after an RSVP is submitted
type RSVPResponse struct {
	Success bool `json:"success"`
	Message string `json:"message"`
	Error string `json:"error,omitempty"`
}
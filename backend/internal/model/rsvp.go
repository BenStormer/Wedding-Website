package model

import "time"

// Database model for an Rsvp entry
type Guest struct {
	ID        string     `firestore:"-"`
	FirstName string     `firestore:"FirstName"`
	LastName  string     `firestore:"LastName"`
	Email     string     `firestore:"Email,omitempty"`
	Phone     string     `firestore:"Phone,omitempty"`
	Attending *bool      `firestore:"Attending"`
	UpdatedAt *time.Time `firestore:"UpdatedAt,omitempty"`
}

// API request model for an Rsvp entry
type RsvpRequest struct {
	FirstName  string `json:"firstname"`
	LastName   string `json:"lastname"`
	Email      string `json:"email,omitempty"`
	Phone      string `json:"phone,omitempty"`
	Attending  *bool   `json:"attending"`
}

// API response after an Rsvp is submitted
type RsvpResponse struct {
	Success bool `json:"success"`
	Message string `json:"message"`
	Error string `json:"error,omitempty"`
}
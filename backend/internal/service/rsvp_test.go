package service

import (
	"errors"
	"fmt"
	"testing"

	"github.com/BenStormer/Wedding-Website/backend/internal/model"
)

// Helper function to create a pointer to a bool
func boolPtr(b bool) *bool {
	return &b
}

type MockRsvpRepository struct {
	FindGuestResult *model.Guest
	FindGuestError  error

	UpdateRsvpResult *model.Guest
	UpdateRsvpError  error

	UpdateRsvpCalled bool
	UpdateRsvpID     string
}

func (m *MockRsvpRepository) FindGuest(firstName, lastName string) (*model.Guest, error) {
	return m.FindGuestResult, m.FindGuestError
}

func (m *MockRsvpRepository) UpdateRsvp(id string, request *model.RsvpRequest) (*model.Guest, error) {
	m.UpdateRsvpCalled = true
	m.UpdateRsvpID = id
	return m.UpdateRsvpResult, m.UpdateRsvpError
}

// Guests not found should return an appropriate error
func TestSubmitRsvp_GuestNotFound(t *testing.T) {
	mockRepo := &MockRsvpRepository{
		FindGuestResult: nil,
	}
	service := NewRsvpService(mockRepo)

	request := model.RsvpRequest{
		FirstName: "John",
		LastName:  "Doe",
		Attending: boolPtr(true),
	}

	response, err := service.SubmitRsvp(request)

	if err == nil {
		t.Errorf("Expected error when guest not found, got nil")
	}
	if !errors.Is(err, ErrGuestNotFound) {
		t.Errorf("Expected ErrGuestNotFound, got %v", err)
	}
	if response.Success != false {
		t.Errorf("Expected unsuccessful response")
	}
}

// Guests making a first-time Rsvp should see success
func TestSubmitRsvp_FirstTimeRsvp(t *testing.T) {
	mockRepo := &MockRsvpRepository{
		FindGuestResult: &model.Guest{
			FirstName: "John",
			LastName:  "Doe",
			Attending: nil,
		},
		UpdateRsvpResult: &model.Guest{
			FirstName: "John",
			LastName:  "Doe",
			Attending: boolPtr(true),
		},
	}
	service := NewRsvpService(mockRepo)

	request := model.RsvpRequest{
		FirstName: "John",
		LastName:  "Doe",
		Attending: boolPtr(true),
	}

	response, err := service.SubmitRsvp(request)

	if err != nil || response.Error != "" {
		t.Errorf("Expected successful submission, got %v", err)
	}
	if response.Success != true {
		t.Errorf("Expected successful response")
	}

	attendingStatus := "attending"
	if !*request.Attending {
		attendingStatus = "not attending"
	}
	expectedResponseMessage := fmt.Sprintf("%s %s has been Rsvp-ed as: %s", request.FirstName, request.LastName, attendingStatus)
	if response.Message != expectedResponseMessage {
		t.Errorf("Expected response message to be: %s\nGot %s", expectedResponseMessage, response.Message)
	}
}

// Guests resubmitting an Rsvp with the same status should not re-submit
func TestSubmitRsvp_ResubmitSameStatus(t *testing.T) {
	mockRepo := &MockRsvpRepository{
		FindGuestResult: &model.Guest{
			FirstName: "John",
			LastName:  "Doe",
			Attending: boolPtr(true),
		},
	}
	service := NewRsvpService(mockRepo)

	request := model.RsvpRequest{
		FirstName: "John",
		LastName:  "Doe",
		Attending: boolPtr(true),
	}

	response, err := service.SubmitRsvp(request)

	if err != nil || response.Error != "" {
		t.Errorf("Expected successful submission, got %v", err)
	}
	if response.Success != true {
		t.Errorf("Expected successful response")
	}

	attendingString := "attending"
	if !*request.Attending {
		attendingString = "not attending"
	}
	expectedResponseMessage := fmt.Sprintf("%s %s was already Rsvp-ed as %s, so no update is necessary", request.FirstName, request.LastName, attendingString)
	if response.Message != expectedResponseMessage {
		t.Errorf("Expected response message to be:\n\"%s\"\nGot:\n\"%s\"", expectedResponseMessage, response.Message)
	}
}

// Guests resubmitting an Rsvp with different status should see success
func TestSubmitRsvp_ResubmitDifferentStatus(t *testing.T) {
	mockRepo := &MockRsvpRepository{
		FindGuestResult: &model.Guest{
			FirstName: "John",
			LastName:  "Doe",
			Attending: boolPtr(false), // Note false here
		},
	}

	service := NewRsvpService(mockRepo)

	request := model.RsvpRequest{
		FirstName: "John",
		LastName:  "Doe",
		Attending: boolPtr(true), // Different from stored response
	}

	response, err := service.SubmitRsvp(request)

	if err != nil || response.Error != "" {
		t.Errorf("Expected successful submission, got %v", err)
	}
	if response.Success != true {
		t.Errorf("Expected successful response")
	}

	attendingString := "attending"
	previousAttendingString := "not attending"
	if !*request.Attending {
		attendingString = "not attending"
		previousAttendingString = "attending"
	}
	expectedResponseMessage := fmt.Sprintf("%s %s was previously Rsvp-ed as: %s, but has now been changed to be: %s", request.FirstName, request.LastName, previousAttendingString, attendingString)
	if response.Message != expectedResponseMessage {
		t.Errorf("Expected response message to be:\n\"%s\"\nGot:\n\"%s\"", expectedResponseMessage, response.Message)
	}
}

package service

import (
	"errors"
	"fmt"

	"github.com/BenStormer/Wedding-Website/backend/internal/model"
	"github.com/BenStormer/Wedding-Website/backend/internal/repository"
)

var ErrGuestNotFound = errors.New("guest not found")

type RsvpService struct {
	repo repository.RsvpRepository
}

func NewRsvpService(repo repository.RsvpRepository) *RsvpService {
	return &RsvpService{
		repo: repo,
	}
}

func (s *RsvpService) SubmitRsvp(request model.RsvpRequest) (*model.RsvpResponse, error) {
	// See if requestor is in the guest list
	guest, err := s.repo.FindGuest(request.FirstName, request.LastName)
	if err != nil {
		return &model.RsvpResponse{
			Success: false,
			Message: "An error occurred",
			Error:   err.Error(),
		}, err
	}
	if guest == nil {
		message := fmt.Sprintf("%s %s was not found in the guest list", request.FirstName, request.LastName)
		return &model.RsvpResponse{
			Success: false,
			Message: message,
			Error:   ErrGuestNotFound.Error(),
		}, ErrGuestNotFound
	}

	// Get previous Rsvp status
	previousRsvpStatus := guest.Attending

	// First time Rsvp-ing
	if previousRsvpStatus == nil {
		guest, err := s.repo.UpdateRsvp(guest.ID, &request)
		if err != nil {
			return &model.RsvpResponse{
				Success: false,
				Message: "First-time Rsvp submission failed",
				Error:   err.Error(),
			}, err
		}

		// Successfully Rsvp-ed for the first time
		attendingStatus := "attending"
		if !*guest.Attending {
			attendingStatus = "not attending"
		}
		message := fmt.Sprintf("%s %s has been Rsvp-ed as: %s", guest.FirstName, guest.LastName, attendingStatus)
		return &model.RsvpResponse{
			Success: true,
			Message: message,
		}, nil
	}

	// Check if previous status is the same as requested status
	if *previousRsvpStatus == request.Attending {
		attendingString := "attending"
		if !request.Attending {
			attendingString = "not attending"
		}
		message := fmt.Sprintf("%s %s was already Rsvp-ed as %s, so no update is necessary", request.FirstName, request.LastName, attendingString)
		response := model.RsvpResponse{
			Success: true,
			Message: message,
		}
		return &response, nil
	}

	// Previous status is not the same as newly requested status
	guest, err = s.repo.UpdateRsvp(guest.ID, &request)
	if err != nil {
		return &model.RsvpResponse{
			Success: false,
			Message: "An error occurred",
			Error:   err.Error(),
		}, err
	}

	attendingString := "attending"
	previousAttendingString := "not attending"
	if !request.Attending {
		attendingString = "not attending"
		previousAttendingString = "attending"
	}
	message := fmt.Sprintf("%s %s was previously Rsvp-ed as: %s, but has now been changed to be: %s", request.FirstName, request.LastName, previousAttendingString, attendingString)

	return &model.RsvpResponse{
		Success: true,
		Message: message,
	}, nil

}

package api

import (
	"encoding/json"
	"errors"
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"

	"github.com/BenStormer/Wedding-Website/backend/internal/model"
	"github.com/BenStormer/Wedding-Website/backend/internal/service"
)

var ErrGuestNotFoundTest = service.ErrGuestNotFound

type MockRsvpService struct {
	SubmitRsvpResult *model.RsvpResponse
	SubmitRsvpError error
}

func (m *MockRsvpService) SubmitRsvp(request model.RsvpRequest) (*model.RsvpResponse, error) {
	return m.SubmitRsvpResult, m.SubmitRsvpError
}

func TestHandleRsvp_Success(t *testing.T) {
	mockService := &MockRsvpService{
		SubmitRsvpResult: &model.RsvpResponse{
			Success: true,
			Message: "Rsvp submitted successfully",
		},
		SubmitRsvpError: nil,
	}
	handler := NewRsvpHandler(mockService)

	body := `{
		"firstname": "John",
		"lastname": "Doe",
		"attending": true
	}`
	req := httptest.NewRequest("PATCH", "/v1/api/rsvp", strings.NewReader(body))
	req.Header.Set("Content-Type", "application/json")

	recorder := httptest.NewRecorder()

	// Call the handler
	handler.HandleRsvp(recorder, req)

	if recorder.Code != http.StatusOK {
		t.Errorf("Expected status OK, got %d", recorder.Code)
	}

	var got model.RsvpResponse
	err := json.Unmarshal(recorder.Body.Bytes(), &got)
	if err != nil {
		t.Fatalf("Failed to parse response JSON: %v", err)
	}

	if got.Success != true {
		t.Errorf("Expected success=true, got %v", got.Success)
	}
	if got.Message != "Rsvp submitted successfully" {
		t.Errorf("Expected message='Rsvp submitted successfully', got '%s'", got.Message)
	}
}


func TestHandleRsvp_InvalidJson(t *testing.T) {
	mockService := &MockRsvpService{}
	handler := NewRsvpHandler(mockService)

	// Malformed JSON (missing closing brace)
	body := `{"firstname": "John", "lastname": "Doe"`
	req := httptest.NewRequest("PATCH", "/v1/api/rsvp", strings.NewReader(body))
	req.Header.Set("Content-Type", "application/json")

	recorder := httptest.NewRecorder()
	handler.HandleRsvp(recorder, req)

	if recorder.Code != http.StatusBadRequest {
		t.Errorf("Expected status 400 Bad Request, got %d", recorder.Code)
	}

	var got model.RsvpResponse
	json.Unmarshal(recorder.Body.Bytes(), &got)

	if got.Success != false {
		t.Errorf("Expected success=false, got %v", got.Success)
	}
	if got.Message != "Invalid JSON syntax" {
		t.Errorf("Expected message='Invalid JSON syntax', got '%s'", got.Message)
	}
}

func TestHandleRsvp_EmptyBody(t *testing.T) {
	mockService := &MockRsvpService{}
	handler := NewRsvpHandler(mockService)

	// Empty body
	req := httptest.NewRequest("PATCH", "/v1/api/rsvp", strings.NewReader(""))
	req.Header.Set("Content-Type", "application/json")

	recorder := httptest.NewRecorder()
	handler.HandleRsvp(recorder, req)

	if recorder.Code != http.StatusBadRequest {
		t.Errorf("Expected status 400 Bad Request, got %d", recorder.Code)
	}

	var got model.RsvpResponse
	json.Unmarshal(recorder.Body.Bytes(), &got)

	if got.Success != false {
		t.Errorf("Expected success=false, got %v", got.Success)
	}
}

func TestHandleRsvp_MissingFirstName(t *testing.T) {
	mockService := &MockRsvpService{}
	handler := NewRsvpHandler(mockService)

	// Missing firstname
	body := `{"lastname": "Doe", "attending": true}`
	req := httptest.NewRequest("PATCH", "/v1/api/rsvp", strings.NewReader(body))
	req.Header.Set("Content-Type", "application/json")

	recorder := httptest.NewRecorder()
	handler.HandleRsvp(recorder, req)

	if recorder.Code != http.StatusBadRequest {
		t.Errorf("Expected status 400 Bad Request, got %d", recorder.Code)
	}

	var got model.RsvpResponse
	json.Unmarshal(recorder.Body.Bytes(), &got)

	if got.Success != false {
		t.Errorf("Expected success=false, got %v", got.Success)
	}
	if got.Message != "First name and last name are required" {
		t.Errorf("Expected message='First name and last name are required', got '%s'", got.Message)
	}
}

func TestHandleRsvp_MissingLastName(t *testing.T) {
	mockService := &MockRsvpService{}
	handler := NewRsvpHandler(mockService)

	// Missing lastname
	body := `{"firstname": "John", "attending": true}`
	req := httptest.NewRequest("PATCH", "/v1/api/rsvp", strings.NewReader(body))
	req.Header.Set("Content-Type", "application/json")

	recorder := httptest.NewRecorder()
	handler.HandleRsvp(recorder, req)

	if recorder.Code != http.StatusBadRequest {
		t.Errorf("Expected status 400 Bad Request, got %d", recorder.Code)
	}

	var got model.RsvpResponse
	json.Unmarshal(recorder.Body.Bytes(), &got)

	if got.Success != false {
		t.Errorf("Expected success=false, got %v", got.Success)
	}
	if got.Message != "First name and last name are required" {
		t.Errorf("Expected message='First name and last name are required', got '%s'", got.Message)
	}
}

func TestHandleRsvp_WrongHttpMethod(t *testing.T) {
	mockService := &MockRsvpService{}
	handler := NewRsvpHandler(mockService)

	// Use GET instead of PATCH
	body := `{"firstname": "John", "lastname": "Doe", "attending": true}`
	req := httptest.NewRequest("GET", "/v1/api/rsvp", strings.NewReader(body))
	req.Header.Set("Content-Type", "application/json")

	recorder := httptest.NewRecorder()
	handler.HandleRsvp(recorder, req)

	if recorder.Code != http.StatusMethodNotAllowed {
		t.Errorf("Expected status 405 Method Not Allowed, got %d", recorder.Code)
	}

	var got model.RsvpResponse
	json.Unmarshal(recorder.Body.Bytes(), &got)

	if got.Success != false {
		t.Errorf("Expected success=false, got %v", got.Success)
	}
	if got.Message != "Method not allowed" {
		t.Errorf("Expected message='Method not allowed', got '%s'", got.Message)
	}
}

func TestHandleRsvp_GuestNotFound(t *testing.T) {
	mockService := &MockRsvpService{
		SubmitRsvpResult: &model.RsvpResponse{
			Success: false,
			Message: "Guest not found",
			Error:   "guest not found",
		},
		SubmitRsvpError: ErrGuestNotFoundTest,
	}
	handler := NewRsvpHandler(mockService)

	body := `{"firstname": "Unknown", "lastname": "Person", "attending": true}`
	req := httptest.NewRequest("PATCH", "/v1/api/rsvp", strings.NewReader(body))
	req.Header.Set("Content-Type", "application/json")

	recorder := httptest.NewRecorder()
	handler.HandleRsvp(recorder, req)

	if recorder.Code != http.StatusNotFound {
		t.Errorf("Expected status 404 Not Found, got %d", recorder.Code)
	}

	var got model.RsvpResponse
	json.Unmarshal(recorder.Body.Bytes(), &got)

	if got.Success != false {
		t.Errorf("Expected success=false, got %v", got.Success)
	}
}

func TestHandleRsvp_InternalError(t *testing.T) {
	mockService := &MockRsvpService{
		SubmitRsvpResult: &model.RsvpResponse{
			Success: false,
			Message: "An error occurred",
			Error:   "database connection failed",
		},
		SubmitRsvpError: errors.New("database connection failed"),
	}
	handler := NewRsvpHandler(mockService)

	body := `{"firstname": "John", "lastname": "Doe", "attending": true}`
	req := httptest.NewRequest("PATCH", "/v1/api/rsvp", strings.NewReader(body))
	req.Header.Set("Content-Type", "application/json")

	recorder := httptest.NewRecorder()
	handler.HandleRsvp(recorder, req)

	if recorder.Code != http.StatusInternalServerError {
		t.Errorf("Expected status 500 Internal Server Error, got %d", recorder.Code)
	}

	var got model.RsvpResponse
	json.Unmarshal(recorder.Body.Bytes(), &got)

	if got.Success != false {
		t.Errorf("Expected success=false, got %v", got.Success)
	}
}
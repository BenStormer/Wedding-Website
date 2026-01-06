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

type MockRegistryService struct {
	GetAllItemsResult *model.RegistryItemsResponse
	GetAllItemsError  error

	RecordGiftResult *model.GiftResponse
	RecordGiftError  error
}

func (m *MockRegistryService) GetAllItems() (*model.RegistryItemsResponse, error) {
	return m.GetAllItemsResult, m.GetAllItemsError
}

func (m *MockRegistryService) RecordGift(request model.GiftRequest) (*model.GiftResponse, error) {
	return m.RecordGiftResult, m.RecordGiftError
}

func TestHandleGift_Success(t *testing.T) {
	mockService := &MockRegistryService{
		RecordGiftResult: &model.GiftResponse{
			Success: true,
			Message: "Thank you, John Doe, for gifting us KitchenAid Stand Mixer!",
		},
		RecordGiftError: nil,
	}
	handler := NewRegistryHandler(mockService)

	body := `{
		"firstname": "John",
		"lastname": "Doe",
		"email": "john@example.com",
		"quantity": 1,
		"itemLabel": "KitchenAid Stand Mixer"
	}`
	req := httptest.NewRequest("POST", "/v1/api/registry/gift", strings.NewReader(body))
	req.Header.Set("Content-Type", "application/json")

	recorder := httptest.NewRecorder()

	handler.HandleGift(recorder, req)

	if recorder.Code != http.StatusOK {
		t.Errorf("Expected status OK, got %d", recorder.Code)
	}

	var got model.GiftResponse
	err := json.Unmarshal(recorder.Body.Bytes(), &got)
	if err != nil {
		t.Fatalf("Failed to parse response JSON: %v", err)
	}

	if got.Success != true {
		t.Errorf("Expected success=true, got %v", got.Success)
	}
}

func TestHandleGift_NoQuantityProvided(t *testing.T) {
	mockService := &MockRegistryService{
		RecordGiftResult: &model.GiftResponse{
			Success: true,
			Message: "Thank you, Jane Smith, for gifting us Family Recipes!",
		},
		RecordGiftError: nil,
	}
	handler := NewRegistryHandler(mockService)

	// Test that quantity defaults to 1 when not provided
	body := `{
		"firstname": "Jane",
		"lastname": "Smith",
		"email": "jane@example.com",
		"itemLabel": "Family Recipes"
	}`
	req := httptest.NewRequest("POST", "/v1/api/registry/gift", strings.NewReader(body))
	req.Header.Set("Content-Type", "application/json")

	recorder := httptest.NewRecorder()

	handler.HandleGift(recorder, req)

	if recorder.Code != http.StatusOK {
		t.Errorf("Expected status OK, got %d", recorder.Code)
	}

	var got model.GiftResponse
	err := json.Unmarshal(recorder.Body.Bytes(), &got)
	if err != nil {
		t.Fatalf("Failed to parse response JSON: %v", err)
	}

	if got.Success != true {
		t.Errorf("Expected success=true, got %v", got.Success)
	}
}

func TestHandleGift_InvalidJson(t *testing.T) {
	mockService := &MockRegistryService{}
	handler := NewRegistryHandler(mockService)

	// Malformed JSON
	body := `{"firstname": "John", "lastname": "Doe"`
	req := httptest.NewRequest("POST", "/v1/api/registry/gift", strings.NewReader(body))
	req.Header.Set("Content-Type", "application/json")

	recorder := httptest.NewRecorder()
	handler.HandleGift(recorder, req)

	if recorder.Code != http.StatusBadRequest {
		t.Errorf("Expected status 400 Bad Request, got %d", recorder.Code)
	}

	var got model.GiftResponse
	json.Unmarshal(recorder.Body.Bytes(), &got)

	if got.Success != false {
		t.Errorf("Expected success=false, got %v", got.Success)
	}
	if got.Message != "Invalid JSON syntax" {
		t.Errorf("Expected message='Invalid JSON syntax', got '%s'", got.Message)
	}
}

func TestHandleGift_MissingFirstName(t *testing.T) {
	mockService := &MockRegistryService{}
	handler := NewRegistryHandler(mockService)

	body := `{"lastname": "Doe", "itemLabel": "KitchenAid Stand Mixer", "quantity": 1}`
	req := httptest.NewRequest("POST", "/v1/api/registry/gift", strings.NewReader(body))
	req.Header.Set("Content-Type", "application/json")

	recorder := httptest.NewRecorder()
	handler.HandleGift(recorder, req)

	if recorder.Code != http.StatusBadRequest {
		t.Errorf("Expected status 400 Bad Request, got %d", recorder.Code)
	}

	var got model.GiftResponse
	json.Unmarshal(recorder.Body.Bytes(), &got)

	if got.Success != false {
		t.Errorf("Expected success=false, got %v", got.Success)
	}
	if got.Message != "First name and last name are required" {
		t.Errorf("Expected message='First name and last name are required', got '%s'", got.Message)
	}
}

func TestHandleGift_MissingItemLabel(t *testing.T) {
	mockService := &MockRegistryService{}
	handler := NewRegistryHandler(mockService)

	body := `{"firstname": "John", "lastname": "Doe", "quantity": 1}`
	req := httptest.NewRequest("POST", "/v1/api/registry/gift", strings.NewReader(body))
	req.Header.Set("Content-Type", "application/json")

	recorder := httptest.NewRecorder()
	handler.HandleGift(recorder, req)

	if recorder.Code != http.StatusBadRequest {
		t.Errorf("Expected status 400 Bad Request, got %d", recorder.Code)
	}

	var got model.GiftResponse
	json.Unmarshal(recorder.Body.Bytes(), &got)

	if got.Success != false {
		t.Errorf("Expected success=false, got %v", got.Success)
	}
	if got.Message != "Item label is required" {
		t.Errorf("Expected message='Item label is required', got '%s'", got.Message)
	}
}

func TestHandleGift_ZeroQuantityDefaultsToOne(t *testing.T) {
	mockService := &MockRegistryService{
		RecordGiftResult: &model.GiftResponse{
			Success: true,
			Message: "Thank you, John Doe, for gifting us KitchenAid Stand Mixer!",
		},
		RecordGiftError: nil,
	}
	handler := NewRegistryHandler(mockService)

	// Quantity 0 should default to 1
	body := `{"firstname": "John", "lastname": "Doe", "itemLabel": "KitchenAid Stand Mixer", "quantity": 0}`
	req := httptest.NewRequest("POST", "/v1/api/registry/gift", strings.NewReader(body))
	req.Header.Set("Content-Type", "application/json")

	recorder := httptest.NewRecorder()
	handler.HandleGift(recorder, req)

	if recorder.Code != http.StatusOK {
		t.Errorf("Expected status OK, got %d", recorder.Code)
	}

	var got model.GiftResponse
	json.Unmarshal(recorder.Body.Bytes(), &got)

	if got.Success != true {
		t.Errorf("Expected success=true, got %v", got.Success)
	}
}

func TestHandleGift_WrongHttpMethod(t *testing.T) {
	mockService := &MockRegistryService{}
	handler := NewRegistryHandler(mockService)

	body := `{"firstname": "John", "lastname": "Doe", "itemLabel": "KitchenAid Stand Mixer", "quantity": 1}`
	req := httptest.NewRequest("GET", "/v1/api/registry/gift", strings.NewReader(body))
	req.Header.Set("Content-Type", "application/json")

	recorder := httptest.NewRecorder()
	handler.HandleGift(recorder, req)

	if recorder.Code != http.StatusMethodNotAllowed {
		t.Errorf("Expected status 405 Method Not Allowed, got %d", recorder.Code)
	}

	var got model.GiftResponse
	json.Unmarshal(recorder.Body.Bytes(), &got)

	if got.Success != false {
		t.Errorf("Expected success=false, got %v", got.Success)
	}
	if got.Message != "Method not allowed" {
		t.Errorf("Expected message='Method not allowed', got '%s'", got.Message)
	}
}

func TestHandleGift_ItemNotFound(t *testing.T) {
	mockService := &MockRegistryService{
		RecordGiftResult: &model.GiftResponse{
			Success: false,
			Message: "Registry item 'Unknown Item' was not found",
			Error:   "registry item not found",
		},
		RecordGiftError: service.ErrItemNotFound,
	}
	handler := NewRegistryHandler(mockService)

	body := `{"firstname": "John", "lastname": "Doe", "itemLabel": "Unknown Item", "quantity": 1}`
	req := httptest.NewRequest("POST", "/v1/api/registry/gift", strings.NewReader(body))
	req.Header.Set("Content-Type", "application/json")

	recorder := httptest.NewRecorder()
	handler.HandleGift(recorder, req)

	if recorder.Code != http.StatusNotFound {
		t.Errorf("Expected status 404 Not Found, got %d", recorder.Code)
	}

	var got model.GiftResponse
	json.Unmarshal(recorder.Body.Bytes(), &got)

	if got.Success != false {
		t.Errorf("Expected success=false, got %v", got.Success)
	}
}

func TestHandleGift_ItemFullyGifted(t *testing.T) {
	mockService := &MockRegistryService{
		RecordGiftResult: &model.GiftResponse{
			Success: false,
			Message: "Thank you, but 'KitchenAid Stand Mixer' has already been fully gifted!",
			Error:   "item has already been fully gifted",
		},
		RecordGiftError: service.ErrItemFullyGifted,
	}
	handler := NewRegistryHandler(mockService)

	body := `{"firstname": "John", "lastname": "Doe", "itemLabel": "KitchenAid Stand Mixer", "quantity": 1}`
	req := httptest.NewRequest("POST", "/v1/api/registry/gift", strings.NewReader(body))
	req.Header.Set("Content-Type", "application/json")

	recorder := httptest.NewRecorder()
	handler.HandleGift(recorder, req)

	if recorder.Code != http.StatusBadRequest {
		t.Errorf("Expected status 400 Bad Request, got %d", recorder.Code)
	}

	var got model.GiftResponse
	json.Unmarshal(recorder.Body.Bytes(), &got)

	if got.Success != false {
		t.Errorf("Expected success=false, got %v", got.Success)
	}
}

func TestHandleGift_InternalError(t *testing.T) {
	mockService := &MockRegistryService{
		RecordGiftResult: &model.GiftResponse{
			Success: false,
			Message: "Failed to record your gift",
			Error:   "database connection failed",
		},
		RecordGiftError: errors.New("database connection failed"),
	}
	handler := NewRegistryHandler(mockService)

	body := `{"firstname": "John", "lastname": "Doe", "itemLabel": "KitchenAid Stand Mixer", "quantity": 1}`
	req := httptest.NewRequest("POST", "/v1/api/registry/gift", strings.NewReader(body))
	req.Header.Set("Content-Type", "application/json")

	recorder := httptest.NewRecorder()
	handler.HandleGift(recorder, req)

	if recorder.Code != http.StatusInternalServerError {
		t.Errorf("Expected status 500 Internal Server Error, got %d", recorder.Code)
	}

	var got model.GiftResponse
	json.Unmarshal(recorder.Body.Bytes(), &got)

	if got.Success != false {
		t.Errorf("Expected success=false, got %v", got.Success)
	}
}

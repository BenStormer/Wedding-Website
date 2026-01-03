package model

import "time"

// Database model for a registry item
type RegistryItem struct {
	ID                string  `firestore:"id"`
	Label             string  `firestore:"label"`
	Description       string  `firestore:"description"`
	Price             float64 `firestore:"price"`
	Image             string  `firestore:"image"`
	Alt               string  `firestore:"alt"`
	RequestedQuantity *int    `firestore:"requested_quantity"` // nil = unlimited (special fund)
	ReceivedQuantity  int     `firestore:"received_quantity"`
	PurchaseLink      string  `firestore:"purchase_link"`
	IsSpecialFund     bool    `firestore:"is_special_fund"`
}

// Database model for a gift record (tracks who gave what)
type GiftRecord struct {
	ID           string     `firestore:"id"`
	ItemLabel    string     `firestore:"item_label"`
	FirstName    string     `firestore:"first_name"`
	LastName     string     `firestore:"last_name"`
	Email        string     `firestore:"email,omitempty"`
	Quantity     int        `firestore:"quantity"`
	IsSpecialFund bool      `firestore:"is_special_fund"`
	CreatedAt    *time.Time `firestore:"created_at"`
}

// API request model for recording a gift
type GiftRequest struct {
	FirstName     string `json:"firstname"`
	LastName      string `json:"lastname"`
	Email         string `json:"email,omitempty"`
	Quantity      int    `json:"quantity"`
	ItemLabel     string `json:"itemLabel"`
	IsSpecialFund bool   `json:"isSpecialFund"`
}

// API response after a gift is recorded
type GiftResponse struct {
	Success bool   `json:"success"`
	Message string `json:"message"`
	Error   string `json:"error,omitempty"`
}

// API response model for a registry item (matches frontend RegistryItem interface)
type RegistryItemResponse struct {
	ID                string  `json:"id"`
	Label             string  `json:"label"`
	Description       string  `json:"description"`
	Price             float64 `json:"price"`
	Image             string  `json:"image"`
	Alt               string  `json:"alt"`
	RequestedQuantity *int    `json:"requested_quantity"`
	ReceivedQuantity  int     `json:"received_quantity"`
	PurchaseLink      string  `json:"purchase_link"`
	IsSpecialFund     bool    `json:"isSpecialFund"`
}

// API response for getting all registry items
type RegistryItemsResponse struct {
	Success bool                   `json:"success"`
	Items   []RegistryItemResponse `json:"items,omitempty"`
	Error   string                 `json:"error,omitempty"`
}

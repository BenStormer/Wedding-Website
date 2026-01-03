package middleware

import (
	"net/http"
	"net/http/httptest"
	"sync"
	"testing"
	"time"
)

func TestRateLimiter_Allow(t *testing.T) {
	// 3 requests per 100ms window
	rl := NewRateLimiter(3, 100*time.Millisecond)
	defer rl.Stop()

	ip := "192.168.1.1"

	// First 3 requests should be allowed
	for i := 0; i < 3; i++ {
		if !rl.Allow(ip) {
			t.Errorf("Request %d should be allowed", i+1)
		}
	}

	// 4th request should be denied
	if rl.Allow(ip) {
		t.Error("4th request should be denied")
	}

	// Wait for window to expire
	time.Sleep(150 * time.Millisecond)

	// Should be allowed again after window expires
	if !rl.Allow(ip) {
		t.Error("Request after window expiry should be allowed")
	}
}

func TestRateLimiter_DifferentIPs(t *testing.T) {
	rl := NewRateLimiter(2, time.Minute)
	defer rl.Stop()

	ip1 := "192.168.1.1"
	ip2 := "192.168.1.2"

	// Both IPs should get their own limits
	if !rl.Allow(ip1) {
		t.Error("First request from IP1 should be allowed")
	}
	if !rl.Allow(ip1) {
		t.Error("Second request from IP1 should be allowed")
	}
	if rl.Allow(ip1) {
		t.Error("Third request from IP1 should be denied")
	}

	// IP2 should still have full quota
	if !rl.Allow(ip2) {
		t.Error("First request from IP2 should be allowed")
	}
	if !rl.Allow(ip2) {
		t.Error("Second request from IP2 should be allowed")
	}
}

func TestRateLimiter_Concurrent(t *testing.T) {
	rl := NewRateLimiter(100, time.Minute)
	defer rl.Stop()

	ip := "192.168.1.1"
	var wg sync.WaitGroup
	allowed := 0
	var mu sync.Mutex

	// Fire 150 concurrent requests
	for i := 0; i < 150; i++ {
		wg.Add(1)
		go func() {
			defer wg.Done()
			if rl.Allow(ip) {
				mu.Lock()
				allowed++
				mu.Unlock()
			}
		}()
	}

	wg.Wait()

	// Exactly 100 should be allowed
	if allowed != 100 {
		t.Errorf("Expected 100 allowed requests, got %d", allowed)
	}
}

func TestGetClientIP(t *testing.T) {
	tests := []struct {
		name       string
		headers    map[string]string
		remoteAddr string
		expected   string
	}{
		{
			name:       "X-Forwarded-For single IP",
			headers:    map[string]string{"X-Forwarded-For": "203.0.113.195"},
			remoteAddr: "10.0.0.1:12345",
			expected:   "203.0.113.195",
		},
		{
			name:       "X-Forwarded-For multiple IPs",
			headers:    map[string]string{"X-Forwarded-For": "203.0.113.195, 70.41.3.18, 150.172.238.178"},
			remoteAddr: "10.0.0.1:12345",
			expected:   "203.0.113.195",
		},
		{
			name:       "X-Forwarded-For with spaces",
			headers:    map[string]string{"X-Forwarded-For": "  203.0.113.195  "},
			remoteAddr: "10.0.0.1:12345",
			expected:   "203.0.113.195",
		},
		{
			name:       "No X-Forwarded-For, use RemoteAddr",
			headers:    map[string]string{},
			remoteAddr: "192.168.1.100:54321",
			expected:   "192.168.1.100",
		},
		{
			name:       "RemoteAddr without port",
			headers:    map[string]string{},
			remoteAddr: "192.168.1.100",
			expected:   "192.168.1.100",
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			req := httptest.NewRequest("GET", "/", nil)
			req.RemoteAddr = tt.remoteAddr
			for k, v := range tt.headers {
				req.Header.Set(k, v)
			}

			got := getClientIP(req)
			if got != tt.expected {
				t.Errorf("getClientIP() = %q, want %q", got, tt.expected)
			}
		})
	}
}

func TestRateLimiter_Middleware(t *testing.T) {
	rl := NewRateLimiter(2, time.Minute)
	defer rl.Stop()

	handlerCalled := 0
	handler := func(w http.ResponseWriter, r *http.Request) {
		handlerCalled++
		w.WriteHeader(http.StatusOK)
	}

	wrapped := rl.Middleware(handler)

	// First 2 requests should pass through
	for i := 0; i < 2; i++ {
		req := httptest.NewRequest("GET", "/", nil)
		req.RemoteAddr = "192.168.1.1:12345"
		rr := httptest.NewRecorder()

		wrapped(rr, req)

		if rr.Code != http.StatusOK {
			t.Errorf("Request %d: expected status 200, got %d", i+1, rr.Code)
		}
	}

	if handlerCalled != 2 {
		t.Errorf("Handler should be called 2 times, got %d", handlerCalled)
	}

	// 3rd request should be rate limited
	req := httptest.NewRequest("GET", "/", nil)
	req.RemoteAddr = "192.168.1.1:12345"
	rr := httptest.NewRecorder()

	wrapped(rr, req)

	if rr.Code != http.StatusTooManyRequests {
		t.Errorf("3rd request: expected status 429, got %d", rr.Code)
	}

	if handlerCalled != 2 {
		t.Errorf("Handler should still be called only 2 times after rate limit, got %d", handlerCalled)
	}

	// Check Retry-After header
	if rr.Header().Get("Retry-After") != "60" {
		t.Errorf("Expected Retry-After header to be 60, got %q", rr.Header().Get("Retry-After"))
	}

	// Note: CORS origin header won't be set without Origin in request
	// This is expected behavior - we only set Allow-Origin for allowed origins
}

func TestRateLimiter_Middleware_OPTIONS(t *testing.T) {
	rl := NewRateLimiter(1, time.Minute)
	defer rl.Stop()

	handlerCalled := 0
	handler := func(w http.ResponseWriter, r *http.Request) {
		handlerCalled++
		w.WriteHeader(http.StatusOK)
	}

	wrapped := rl.Middleware(handler)

	// First, exhaust the rate limit with a regular request
	req := httptest.NewRequest("GET", "/", nil)
	req.RemoteAddr = "192.168.1.1:12345"
	req.Header.Set("Origin", "https://aspenandbenjamin.com")
	rr := httptest.NewRecorder()
	wrapped(rr, req)

	if handlerCalled != 1 {
		t.Errorf("Handler should be called 1 time, got %d", handlerCalled)
	}

	// OPTIONS request should still work (not rate limited)
	req = httptest.NewRequest("OPTIONS", "/", nil)
	req.RemoteAddr = "192.168.1.1:12345"
	req.Header.Set("Origin", "https://aspenandbenjamin.com")
	rr = httptest.NewRecorder()
	wrapped(rr, req)

	if rr.Code != http.StatusOK {
		t.Errorf("OPTIONS request: expected status 200, got %d", rr.Code)
	}

	// Handler should NOT be called for OPTIONS (middleware handles it)
	if handlerCalled != 1 {
		t.Errorf("Handler should still be called only 1 time after OPTIONS, got %d", handlerCalled)
	}

	// Check CORS headers are set
	if rr.Header().Get("Access-Control-Allow-Origin") != "https://aspenandbenjamin.com" {
		t.Errorf("Expected Access-Control-Allow-Origin header to be https://aspenandbenjamin.com, got %q", rr.Header().Get("Access-Control-Allow-Origin"))
	}
	if rr.Header().Get("Access-Control-Allow-Methods") != "GET, POST, PATCH, OPTIONS" {
		t.Errorf("Expected Access-Control-Allow-Methods header, got %q", rr.Header().Get("Access-Control-Allow-Methods"))
	}
	if rr.Header().Get("Access-Control-Allow-Headers") != "Content-Type, X-HTTP-Method-Override" {
		t.Errorf("Expected Access-Control-Allow-Headers header, got %q", rr.Header().Get("Access-Control-Allow-Headers"))
	}
}

func TestRateLimiter_Middleware_CORS_WWW(t *testing.T) {
	rl := NewRateLimiter(10, time.Minute)
	defer rl.Stop()

	handler := func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
	}

	wrapped := rl.Middleware(handler)

	// Test www subdomain is also allowed
	req := httptest.NewRequest("OPTIONS", "/", nil)
	req.Header.Set("Origin", "https://www.aspenandbenjamin.com")
	rr := httptest.NewRecorder()
	wrapped(rr, req)

	if rr.Header().Get("Access-Control-Allow-Origin") != "https://www.aspenandbenjamin.com" {
		t.Errorf("Expected Access-Control-Allow-Origin header to be https://www.aspenandbenjamin.com, got %q", rr.Header().Get("Access-Control-Allow-Origin"))
	}
}

func TestRateLimiter_Middleware_CORS_DisallowedOrigin(t *testing.T) {
	rl := NewRateLimiter(10, time.Minute)
	defer rl.Stop()

	handler := func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
	}

	wrapped := rl.Middleware(handler)

	// Test that unknown origins don't get CORS headers
	req := httptest.NewRequest("OPTIONS", "/", nil)
	req.Header.Set("Origin", "https://evil-site.com")
	rr := httptest.NewRecorder()
	wrapped(rr, req)

	if rr.Header().Get("Access-Control-Allow-Origin") != "" {
		t.Errorf("Expected no Access-Control-Allow-Origin header for disallowed origin, got %q", rr.Header().Get("Access-Control-Allow-Origin"))
	}
}

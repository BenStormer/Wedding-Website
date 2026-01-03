package middleware

import (
	"net/http"
	"strings"
	"sync"
	"time"
)

type visitor struct {
	lastSeen time.Time
	count    int
}

// RateLimiter implements a simple in-memory rate limiter per IP address.
type RateLimiter struct {
	visitors map[string]*visitor
	mu       sync.Mutex
	rate     int           // max requests per window
	window   time.Duration // time window
	stopCh   chan struct{} // for graceful shutdown of cleanup goroutine
}

// NewRateLimiter creates a rate limiter that allows `rate` requests per `window` duration.
// Example: NewRateLimiter(10, time.Minute) allows 10 requests per minute per IP.
func NewRateLimiter(rate int, window time.Duration) *RateLimiter {
	rl := &RateLimiter{
		visitors: make(map[string]*visitor),
		rate:     rate,
		window:   window,
		stopCh:   make(chan struct{}),
	}
	go rl.cleanup()
	return rl
}

// cleanup periodically removes stale entries to prevent memory leaks.
func (rl *RateLimiter) cleanup() {
	ticker := time.NewTicker(time.Minute)
	defer ticker.Stop()

	for {
		select {
		case <-ticker.C:
			rl.mu.Lock()
			for ip, v := range rl.visitors {
				if time.Since(v.lastSeen) > rl.window*2 {
					delete(rl.visitors, ip)
				}
			}
			rl.mu.Unlock()
		case <-rl.stopCh:
			return
		}
	}
}

// Stop gracefully stops the cleanup goroutine.
func (rl *RateLimiter) Stop() {
	close(rl.stopCh)
}

// Allow checks if a request from the given IP should be allowed.
func (rl *RateLimiter) Allow(ip string) bool {
	rl.mu.Lock()
	defer rl.mu.Unlock()

	now := time.Now()
	v, exists := rl.visitors[ip]

	// New visitor or window expired - reset count
	if !exists || now.Sub(v.lastSeen) > rl.window {
		rl.visitors[ip] = &visitor{lastSeen: now, count: 1}
		return true
	}

	// Check if over limit
	if v.count >= rl.rate {
		return false
	}

	// Increment count
	v.count++
	v.lastSeen = now
	return true
}

// getClientIP extracts the real client IP from the request.
// Cloud Run and Cloudflare set X-Forwarded-For header.
func getClientIP(r *http.Request) string {
	// X-Forwarded-For can contain multiple IPs: "client, proxy1, proxy2"
	// The first one is the original client
	if xff := r.Header.Get("X-Forwarded-For"); xff != "" {
		if idx := strings.Index(xff, ","); idx != -1 {
			return strings.TrimSpace(xff[:idx])
		}
		return strings.TrimSpace(xff)
	}

	// Fallback to RemoteAddr (strip port if present)
	ip := r.RemoteAddr
	if idx := strings.LastIndex(ip, ":"); idx != -1 {
		return ip[:idx]
	}
	return ip
}

// setCORSHeaders sets the CORS headers for cross-origin requests.
func setCORSHeaders(w http.ResponseWriter) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PATCH, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
}

// Middleware wraps an http.HandlerFunc with rate limiting.
func (rl *RateLimiter) Middleware(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		// Always set CORS headers first
		setCORSHeaders(w)

		// Handle preflight OPTIONS request - don't rate limit these
		if r.Method == http.MethodOptions {
			w.WriteHeader(http.StatusOK)
			return
		}

		ip := getClientIP(r)

		if !rl.Allow(ip) {
			w.Header().Set("Content-Type", "application/json")
			w.Header().Set("Retry-After", "60")
			w.WriteHeader(http.StatusTooManyRequests)
			w.Write([]byte(`{"success":false,"message":"Too many requests. Please try again later."}`))
			return
		}

		next(w, r)
	}
}

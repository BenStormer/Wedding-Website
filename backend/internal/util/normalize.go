package util

import (
	"fmt"
	"regexp"
	"strings"

	"golang.org/x/text/cases"
	"golang.org/x/text/language"
)

var (
	nonDigitRegex    = regexp.MustCompile(`\D`)
	multiSpaceRegex  = regexp.MustCompile(`\s+`)
	titleCaser       = cases.Title(language.English)
)

// NormalizePhone strips all non-digit characters and formats as (XXX) XXX-XXXX
// Accepts various formats: 5551234567, 555-123-4567, (555) 123-4567, +1 555 123 4567, etc.
// Returns empty string if input is empty.
// Returns original string if it can't be normalized (e.g., international numbers).
func NormalizePhone(phone string) string {
	if phone == "" {
		return ""
	}

	// Remove all non-digit characters
	digits := nonDigitRegex.ReplaceAllString(phone, "")

	// Handle country code (if 11 digits starting with 1, strip the 1)
	if len(digits) == 11 && digits[0] == '1' {
		digits = digits[1:]
	}

	// Must have exactly 10 digits for US phone number
	if len(digits) != 10 {
		// Return original if we can't normalize (might be international)
		return phone
	}

	// Format as (XXX) XXX-XXXX
	return fmt.Sprintf("(%s) %s-%s", digits[0:3], digits[3:6], digits[6:10])
}

// NormalizeName normalizes a name to title case with trimmed whitespace
// "  JOHN  DOE  " -> "John Doe"
// "jane" -> "Jane"
// "mary-jane" -> "Mary-Jane"
// "o'brien" -> "O'Brien"
func NormalizeName(name string) string {
	if name == "" {
		return ""
	}

	// Trim and collapse multiple spaces
	name = strings.TrimSpace(name)
	name = multiSpaceRegex.ReplaceAllString(name, " ")

	// Convert to title case
	return titleCaser.String(strings.ToLower(name))
}

// NormalizeEmail normalizes an email to lowercase with trimmed whitespace
func NormalizeEmail(email string) string {
	return strings.ToLower(strings.TrimSpace(email))
}

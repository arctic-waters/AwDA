package util

import (
	"crypto/sha1"
	"fmt"

	"golang.org/x/crypto/bcrypt"
)

func HashString(password string, cost int) string {
	hash, err := bcrypt.GenerateFromPassword([]byte(password), cost)

	if err != nil {
		return ""
	}

	return string(hash)
}

func VerifyString(password string, hash string) bool {
	return bcrypt.CompareHashAndPassword([]byte(hash), []byte(password)) == nil
}

func HashStringSHA(str string) string {
	h := sha1.New()
	h.Write([]byte(str))

	return fmt.Sprintf("%x", h.Sum(nil))
}
package util

import (
	"crypto/rand"
	"encoding/hex"
)

func GenerateRandomByes(size int) (blk []byte, err error) {
	blk = make([]byte, size)
	_, err = rand.Read(blk)
	return
}

func GenerateRandomHex(len int) string {
	bytes, err := GenerateRandomByes(len / 2)

	if err != nil {
		return ""
	}

	return hex.EncodeToString(bytes)
}
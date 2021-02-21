package model

import (
	"gorm.io/gorm"
)

type Password struct {
	gorm.Model

	Name	string
	Hash	string
}
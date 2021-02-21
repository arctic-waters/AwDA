package model

import (
	"gorm.io/gorm"
)

type Email struct {
	gorm.Model

	Name	string
	Email	string
}
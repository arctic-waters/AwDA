package model

import (
	"gorm.io/gorm"
)

type Device struct {
	gorm.Model

	Name	string
	Image 	string

	Vulnerabilities []*Vulnerability	`gorm:"many2many:device_vulnerabilities;"`
}
package model

import (
	"gorm.io/gorm"
)

type Software struct {
	gorm.Model

	Type			string
	Name			string
	Version			string
	Image			string

	Vulnerabilities	[]*Vulnerability	`gorm:"many2many:software_vulnerabilities;"`
}
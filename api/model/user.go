package model

import (
	"gorm.io/gorm"
)

type User struct {
	gorm.Model

	Username	string		`gorm:"unique;"`
	PassHash	string
	Token		string

	Devices		[]*Device	`gorm:"many2many:user_devices;"`
	Emails		[]*Email	`gorm:"many2many:user_emails;"`
	Passwords	[]*Password	`gorm:"many2many:user_passwords;"`
	Software	[]*Software	`gorm:"many2many:user_software;"`
}
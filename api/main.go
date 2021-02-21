package main

import (
	"gorm.io/gorm"
	"gorm.io/driver/sqlite"

	"arc.io/awda/db"
	"arc.io/awda/model"
	"arc.io/awda/router"
)

func main() {
	// Database
	d, _ := gorm.Open(sqlite.Open("database.db"), &gorm.Config{})

	_ = d.AutoMigrate(
		&model.User{},
		&model.Device{},
		&model.Email{},
		&model.Password{},
		&model.Software{},
		&model.Vulnerability{},
	)

	db.Database = d

	// Start
	r := router.New()
	r.Logger.Fatal(r.Start(":3000"))
}
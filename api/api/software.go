package api

import (
	"net/http"
	"strconv"

	"github.com/labstack/echo/v4"

	"arc.io/awda/db"
	"arc.io/awda/model"
)

func GetAllSoftware() echo.HandlerFunc {
	return func(c echo.Context) (err error) {
		var software []model.Software
		db.Database.Find(&software)

		return c.JSON(http.StatusOK, software)
	}
}

func GetUserSoftware() echo.HandlerFunc {
	return func(c echo.Context) (err error) {
		user := GetUserFromQueryString(c)

		var software []model.Software
		_ = db.Database.Model(&user).Association("Software").Find(&software)

		return c.JSON(http.StatusOK, software)
	}
}

func GetSoftware() echo.HandlerFunc {
	return func(c echo.Context) (err error) {
		id := c.QueryParam("id")

		var device model.Software
		db.Database.First(&device, id)

		return c.JSON(http.StatusOK, device)
	}
}

func SoftwareVulnerabilities() echo.HandlerFunc {
	return func(c echo.Context) (err error) {
		id, _ := strconv.ParseInt(c.QueryParam("id"), 10, 64)

		var software model.Software
		db.Database.First(&software, id)

		var vulnerabilities []model.Vulnerability
		_ = db.Database.Model(&software).Association("Vulnerabilities").Find(&vulnerabilities)

		return c.JSON(http.StatusOK, vulnerabilities)
	}
}

func AddSoftware() echo.HandlerFunc {
	return func(c echo.Context) (err error) {
		user, body := GetUserFromBody(c)
		id := int(body["id"].(float64))

		var software model.Software
		db.Database.Find(&software, id)

		_ = db.Database.Model(&user).Association("Software").Append(&software)

		return c.JSON(http.StatusOK, struct {
			ID uint
		}{
			ID: software.ID,
		})
	}
}

func RemoveSoftware() echo.HandlerFunc {
	return func(c echo.Context) error {
		user, body := GetUserFromBody(c)
		id := int(body["id"].(float64))

		var software model.Software
		db.Database.First(&software, id)

		return db.Database.Model(&user).Association("Software").Delete(software)
	}
}
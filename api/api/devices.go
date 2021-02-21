package api

import (
	"net/http"
	"strconv"

	"github.com/labstack/echo/v4"

	"arc.io/awda/db"
	"arc.io/awda/model"
)

func GetDevice() echo.HandlerFunc {
	return func(c echo.Context) (err error) {
		id := c.QueryParam("id")

		var device model.Device
		db.Database.First(&device, id)

		return c.JSON(http.StatusOK, device)
	}
}

func GetDevices() echo.HandlerFunc {
	return func(c echo.Context) (err error) {
		var devices []model.Device
		db.Database.Find(&devices)
		return c.JSON(http.StatusOK, devices)
	}
}

func GetUserDevices() echo.HandlerFunc {
	return func(c echo.Context) (err error) {
		user := GetUserFromQueryString(c)

		var devices []model.Device
		_ = db.Database.Model(&user).Association("Devices").Find(&devices)

		return c.JSON(http.StatusOK, devices)
	}
}

func DeviceVulnerabilities() echo.HandlerFunc {
	return func(c echo.Context) (err error) {
		id, _ := strconv.ParseInt(c.QueryParam("id"), 10, 64)

		var device model.Device
		db.Database.First(&device, id)

		var vulnerabilities []model.Vulnerability
		err = db.Database.Model(&device).Association("Vulnerabilities").Find(&vulnerabilities)

		return c.JSON(http.StatusOK, vulnerabilities)
	}
}

func AddDevice() echo.HandlerFunc {
	return func(c echo.Context) (err error) {
		user, body := GetUserFromBody(c)
		id := int(body["id"].(float64))

		var device model.Device
		db.Database.Find(&device, id)

		_ = db.Database.Model(&user).Association("Devices").Append(&device)

		return c.JSON(http.StatusOK, struct {
			ID uint
		}{
			ID: device.ID,
		})
	}
}

func RemoveDevice() echo.HandlerFunc {
	return func(c echo.Context) error {
		user, body := GetUserFromBody(c)
		id := int(body["id"].(float64))

		var device model.Device
		db.Database.Find(&device, id)

		return db.Database.Model(&user).Association("Devices").Delete(device)
	}
}
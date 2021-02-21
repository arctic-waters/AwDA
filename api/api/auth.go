package api

import (
	"errors"
	"net/http"

	"github.com/labstack/echo/v4"

	"arc.io/awda/db"
	"arc.io/awda/model"
	"arc.io/awda/util"
)

func CreateUser() echo.HandlerFunc {
	return func(c echo.Context) (err error) {
		body := util.RequestBody(c)
		username := body["username"].(string)
		password := body["password"].(string)

		token := util.GenerateRandomHex(32)

		return db.Database.Save(&model.User{
			Username: username,
			PassHash: util.HashString(password, 11),
			Token: token,
		}).Error
	}
}

func Login() echo.HandlerFunc {
	return func(c echo.Context) (err error) {
		body := util.RequestBody(c)
		username := body["username"].(string)
		password := body["password"].(string)

		var user model.User
		db.Database.Where("username = ?", username).First(&user)

		valid := util.VerifyString(password, user.PassHash)

		if !valid {
			return errors.New("invalid")
		}

		return c.JSON(http.StatusOK, struct {
			Token string
		}{
			Token: user.Token,
		})
	}
}
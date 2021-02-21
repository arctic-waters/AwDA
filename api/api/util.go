package api

import (
	"github.com/labstack/echo/v4"

	"arc.io/awda/db"
	"arc.io/awda/model"
	"arc.io/awda/util"
)

func GetUserFromQueryString(c echo.Context) model.User {
	token := c.QueryParam("token")

	var user model.User
	db.Database.Where("token = ?", token).Find(&user)

	return user
}

func GetUserFromBody(c echo.Context) (user model.User, body map[string]interface{}) {
	body = util.RequestBody(c)
	token := body["token"].(string)

	db.Database.Where("token = ?", token).Find(&user)
	return
}

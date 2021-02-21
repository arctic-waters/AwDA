package api

import (
	"errors"
	"fmt"
	"net/http"
	"strconv"
	"strings"

	"github.com/labstack/echo/v4"
	"github.com/levigross/grequests"

	"arc.io/awda/db"
	"arc.io/awda/model"
	"arc.io/awda/util"
)

func GetAccount() echo.HandlerFunc {
	return func(c echo.Context) (err error) {
		id := c.QueryParam("id")
		typ := c.QueryParam("type")

		if typ == "email" {
			var email model.Email
			db.Database.First(&email, id)
			return c.JSON(http.StatusOK, email)
		}

		if typ == "password" {
			var password model.Password
			db.Database.First(&password, id)
			return c.JSON(http.StatusOK, password)
		}

		return errors.New("invalid_type")
	}
}

type Account struct {
	Type	string
	Name 	string
	Value	string
	ID		int
}

func GetAccounts() echo.HandlerFunc {
	return func(c echo.Context) (err error) {
		user := GetUserFromQueryString(c)

		var emails []model.Email
		_ = db.Database.Model(&user).Association("Emails").Find(&emails)

		var passwords []model.Password
		_ = db.Database.Model(&user).Association("Passwords").Find(&passwords)

		var things []Account

		for _, email := range emails {
			things = append(things, Account{"email",email.Name,email.Email,int(email.ID)})
		}

		for _, password := range passwords {
			things = append(things, Account{"password",password.Name,password.Hash, int(password.ID)})
		}

		return c.JSON(http.StatusOK, things)
	}
}

func AddAccount() echo.HandlerFunc {
	return func(c echo.Context) (err error) {
		user, body := GetUserFromBody(c)
		fmt.Println(body)
		typ := body["type"].(string)
		name := body["name"].(string)
		value := body["value"].(string)

		var id uint

		if typ == "email" {
			email := model.Email{
				Name: name,
				Email: value,
			}

			_ = db.Database.Model(&user).Association("Emails").Append(&email)
			id = email.ID
		}

		if typ == "password" {
			password := model.Password{
				Name: name,
				Hash: util.HashStringSHA(value),
			}

			_ = db.Database.Model(&user).Association("Passwords").Append(&password)
			id = password.ID
		}

		return c.JSON(http.StatusOK, struct {
			ID uint
		}{
			ID: id,
		})
	}
}

func RemoveAccount() echo.HandlerFunc {
	return func(c echo.Context) error {
		user, body := GetUserFromBody(c)
		fmt.Println(body)
		typ := body["type"].(string)
		id := int(body["id"].(float64))

		if typ == "email" {
			return db.Database.Model(&user).Association("Emails").Delete(id)
		}

		if typ == "password" {
			return db.Database.Model(&user).Association("Passwords").Delete(id)
		}

		return errors.New("invalid_type")
	}
}

func EditAccount() echo.HandlerFunc {
	return func(c echo.Context) (err error) {
		body := util.RequestBody(c)
		id := int(body["id"].(float64))
		typ := body["type"].(string)
		name := body["name"].(string)
		value := body["value"].(string)

		if typ == "email" {
			var email model.Email
			db.Database.First(&email, id)

			email.Name = name
			email.Email = value
			return db.Database.Save(&email).Error
		}

		if typ == "password" {
			var password model.Password
			db.Database.First(&password, id)

			password.Name = name
			password.Hash = util.HashStringSHA(value)
			return db.Database.Save(&password).Error
		}

		return errors.New("invalid_type")
	}
}

func AccountVulnerabilities() echo.HandlerFunc {
	return func(c echo.Context) (err error) {
		id, _ := strconv.ParseInt(c.QueryParam("id"), 10, 64)
		typ := c.QueryParam("type")

		if typ == "email" {
			var email model.Email
			db.Database.First(&email, id)
			data, err := grequests.Get("https://haveibeenpwned.com/unifiedsearch/" + email.Email, nil)

			if err != nil && data.StatusCode == 200 {
				return c.JSON(http.StatusOK, struct {Breaches	int}{Breaches: 0})
			}

			return c.JSON(http.StatusOK, struct {
				Breaches int
			}{
				Breaches: 1,
			})
		}

		return c.JSON(http.StatusOK, struct {
			Breaches int
		}{
			Breaches: 0,
		})

		if typ == "password" {
			var password model.Password
			db.Database.First(&password, id)

			res, err := grequests.Get("https://api.pwnedpasswords.com/range/" + password.Hash[:5], nil)

			if err != nil {
				return err
			}

			breaches := int64(0)

			for _, line := range strings.Split(res.String(), "\n") {
				split := strings.Split(line, ":")

				if split[0] != password.Hash[5:] {
					continue
				}

				breaches, _ = strconv.ParseInt(split[0], 10, 64)
				break
			}

			return c.JSON(http.StatusOK, struct{
				Breaches	int
			}{
				Breaches: int(breaches),
			})
		}

		return errors.New("invalid_type")
	}
}
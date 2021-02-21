package router

import (
	"arc.io/awda/api"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"github.com/labstack/gommon/log"
)

func New() *echo.Echo {
	e := echo.New()

	e.Logger.SetLevel(log.INFO)

	e.Pre(middleware.RemoveTrailingSlash())
	e.Pre(middleware.Logger())
	e.Pre(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"*"},
		AllowHeaders: []string{echo.HeaderOrigin, echo.HeaderContentType, echo.HeaderAccept, echo.HeaderAuthorization},
		AllowMethods: []string{echo.GET, echo.HEAD, echo.PUT, echo.PATCH, echo.POST, echo.DELETE},
	}))

	e.Static("/", "assets")

	e.GET("/", func(c echo.Context) error {
		return c.File("assets/index.html")
	})

	e.GET("/login", func(c echo.Context) error {
		return c.File("assets/login.html")
	})

	a := e.Group("/api")
	{
		a.POST("/auth/login", api.Login())
		a.POST("/auth/signup", api.CreateUser())

		a.GET("/user/devices", api.GetUserDevices())
		a.POST("/user/device/add", api.AddDevice())
		a.POST("/user/device/remove", api.RemoveDevice())
		a.GET("/user/accounts", api.GetAccounts())
		a.POST("/user/account/add", api.AddAccount())
		a.POST("/user/account/remove", api.RemoveAccount())
		a.GET("/user/software", api.GetUserSoftware())
		a.POST("/user/software/add", api.AddSoftware())
		a.POST("/user/software/remove", api.RemoveSoftware())

		a.GET("/devices", api.GetDevices())
		a.GET("/device", api.GetDevice())
		a.GET("/device/vulnerabilities", api.DeviceVulnerabilities())

		a.GET("/software/all", api.GetAllSoftware())
		a.GET("/software", api.GetSoftware())
		a.GET("/software/vulnerabilities", api.SoftwareVulnerabilities())

		a.GET("/account", api.GetAccount())
		a.POST("/account/edit", api.EditAccount())
		a.GET("/account/vulnerabilities", api.AccountVulnerabilities())
	}

	return e
}

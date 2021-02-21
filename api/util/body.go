package util

import (
	"github.com/labstack/echo/v4"
)

func RequestBody(c echo.Context) map[string]interface{} {
	var json map[string]interface{}

	if err := c.Bind(&json); err != nil {
		return nil
	}

	return json
}

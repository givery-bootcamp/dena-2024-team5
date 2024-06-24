package main

import (
	"fmt"
	"myapp/internal/config"
	"myapp/internal/external"
	"myapp/internal/middleware"

	"github.com/gin-gonic/gin"
)

// @title web-application team 5 API
// @version 1.0
// @description このswaggerはweb application演習5班のAPI仕様書です。
// @BasePath /
func main() {
	// load .env
	// err := godotenv.Load()
	// if err != nil {
	// 	panic("Error loading .env file")
	// }
	// Initialize database
	external.SetupDB()

	// Setup webserver
	app := gin.Default()
	app.Use(middleware.Transaction())
	app.Use(middleware.Cors())
	middleware.SetupRoutes(app)
	app.Run(fmt.Sprintf("%s:%d", config.HostName, config.Port))
}

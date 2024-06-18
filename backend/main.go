package main

import (
	"fmt"
	"myapp/internal/config"
	"myapp/internal/external"
	"myapp/internal/middleware"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

// @title web-application team 5 API
// @version 1.0
// @description このswaggerはweb application演習5班のAPI仕様書です。
// @host localhost:9000
// @BasePath /
func main() {
	// Initialize database
	external.SetupDB()
	// load .env
	err := godotenv.Load()
	if err != nil {
		panic("Error loading .env file")
	}

	// Setup webserver
	app := gin.Default()
	app.Use(middleware.Transaction())
	app.Use(middleware.Cors())
	middleware.SetupRoutes(app)
	app.Run(fmt.Sprintf("%s:%d", config.HostName, config.Port))
}

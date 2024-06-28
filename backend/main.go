package main

import (
	"fmt"
	"myapp/internal/config"
	"myapp/internal/external"
	"myapp/internal/middleware"
	"myapp/internal/sse"

	"github.com/gin-gonic/gin"
)

// @title web-application team 5 API
// @version 1.0
// @description このswaggerはweb application演習5班のAPI仕様書です。
// @BasePath /
func main() {
	// Initialize database
	external.SetupDB()
	external.SetupS3Client()

	broker := sse.NewServer()

	// Setup webserver
	app := gin.Default()
	app.Use(middleware.Transaction())
	app.Use(middleware.AWS())
	app.Use(middleware.Cors())
	app.Use(middleware.NotificationBroker(broker))
	middleware.SetupRoutes(app)
	app.Run(fmt.Sprintf("%s:%d", config.HostName, config.Port))
}

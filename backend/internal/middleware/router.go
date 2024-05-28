package middleware

import (
	"myapp/internal/controllers"

	_ "myapp/docs"

	"github.com/gin-gonic/gin"

	swaggerfiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
)

func SetupRoutes(app *gin.Engine) {
	app.GET("/", func(ctx *gin.Context) {
		ctx.String(200, "It works")
	})
	app.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerfiles.Handler))
	app.GET("/hello", controllers.HelloWorld)
	app.GET("/posts", controllers.GetList)
	app.GET("/posts/:postId", controllers.GetDetail)
}

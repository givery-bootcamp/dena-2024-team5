package middleware

import (
	_ "myapp/docs"
	"myapp/internal/dependency"

	"github.com/gin-gonic/gin"

	swaggerfiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
)

func SetupRoutes(app *gin.Engine) {
	app.GET("/", func(ctx *gin.Context) {
		ctx.String(200, "It works")
	})
	app.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerfiles.Handler))

	container := dependency.NewDIContainer()

	app.GET("/posts", container.PostGetListController)
	app.GET("/posts/:postID", container.PostGetDetailController)

	app.POST("/signin", container.AuthSigninController)
	app.POST("/signout", container.AuthSignoutController)
}

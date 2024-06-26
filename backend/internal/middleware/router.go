package middleware

import (
	_ "myapp/docs"
	"myapp/internal/dependency"
	"myapp/internal/util/channel"
	"sync"

	"github.com/gin-gonic/gin"

	swaggerfiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
)

var clients = make(map[chan string]bool)
var mu sync.Mutex

func SetupRoutes(app *gin.Engine) {
	broker := channel.NewServer()
	app.GET("/", func(ctx *gin.Context) {
		ctx.String(200, "It works")
	})
	app.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerfiles.Handler))

	container := dependency.NewDIContainer()
	app.POST("/signin", container.AuthSigninController)
	app.POST("/signout", container.AuthSignoutController)
	app.POST("/users", container.UserCreateController)
	app.GET("/stream", broker.Stream)
	app.POST("/messages", broker.BroadcastMessage)

	authGroup := app.Group("")
	authGroup.Use(JwtAuthorizeMiddleware())
	{
		authGroup.GET("/posts", container.PostGetListController)
		authGroup.GET("/posts/:postID", container.PostGetDetailController)
		authGroup.POST("/posts", container.PostNewController)
		authGroup.PUT("/posts/:postID", container.PostUpdateController)
		authGroup.DELETE("/posts/:postID", container.PostDeleteController)
		authGroup.POST("/posts/:postID/like", container.PostLikeAddController)

		authGroup.POST("/comments", container.CommentNewController)
		authGroup.PUT("/comments/:commentID", container.CommentUpdateController)
		authGroup.DELETE("/comments/:commentID", container.CommentDeleteController)

		authGroup.GET("/users/me", container.UserGetMeController)
	}
}

package dependency

import (
	"myapp/internal/controllers"
	"myapp/internal/repositories"
	"myapp/internal/usecases"

	"github.com/gin-gonic/gin"
)

type DIContainer struct{}

func NewDIContainer() *DIContainer {
	return &DIContainer{}
}

func (di *DIContainer) PostGetListController(ctx *gin.Context) {
	repository := repositories.NewPostRepository(controllers.DB(ctx))
	usecase := usecases.NewPostGetListUsecase(repository)
	controllers.PostGetList(ctx, usecase)
}

func (di *DIContainer) PostGetDetailController(ctx *gin.Context) {
	repository := repositories.NewPostRepository(controllers.DB(ctx))
	usecase := usecases.NewPostGetDetailUsecase(repository)
	controllers.PostGetDetail(ctx, usecase)
}

func (di *DIContainer) AuthSigninController(ctx *gin.Context) {
	repository := repositories.NewUserRepository(controllers.DB(ctx))
	usecase := usecases.NewAuthSigninUsecase(repository)
	controllers.AuthSignin(ctx, usecase)
}

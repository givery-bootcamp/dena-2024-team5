package dependency

import (
	"myapp/internal/controller"
	"myapp/internal/repository"
	"myapp/internal/usecase"

	"github.com/gin-gonic/gin"
)

type DIContainer struct{}

func NewDIContainer() *DIContainer {
	return &DIContainer{}
}

func (di *DIContainer) PostGetListController(ctx *gin.Context) {
	repository := repository.NewPostRepository(controller.DB(ctx))
	usecase := usecase.NewPostGetListUsecase(repository)
	controller.PostGetList(ctx, usecase)
}

func (di *DIContainer) PostGetDetailController(ctx *gin.Context) {
	repository := repository.NewPostRepository(controller.DB(ctx))
	usecase := usecase.NewPostGetDetailUsecase(repository)
	controller.PostGetDetail(ctx, usecase)
}

func (di *DIContainer) AuthSigninController(ctx *gin.Context) {
	repository := repository.NewUserRepository(controller.DB(ctx))
	usecase := usecase.NewAuthSigninUsecase(repository)
	controller.AuthSignin(ctx, usecase)
}

func (di *DIContainer) UserCreateController(ctx *gin.Context) {
	repository := repository.NewUserRepository(controller.DB(ctx))
	usecase := usecase.NewUserCreateUsecase(repository)
	controller.UserCreate(ctx, usecase)
}

func (di *DIContainer) AuthSignoutController(ctx *gin.Context) {
	controller.AuthSignout(ctx)
}

func (di *DIContainer) UserGetMeController(ctx *gin.Context) {
	repository := repository.NewUserRepository(controller.DB(ctx))
	usecase := usecase.NewUserGetMeUsecase(repository)
	controller.UserGetMe(ctx, usecase)
}

func (di *DIContainer) PostNewController(ctx *gin.Context) {
	repository := repository.NewPostRepository(controller.DB(ctx))
	usecase := usecase.NewPostNewUsecase(repository)
	controller.PostNew(ctx, usecase)
}

func (di *DIContainer) PostUpdateController(ctx *gin.Context) {
	repository := repository.NewPostRepository(controller.DB(ctx))
	postUpdateUsecase := usecase.NewPostUpdateUsecase(repository)
	postOwnerValidateUsecase := usecase.NewPostOwnerValidateUsecase(repository)
	controller.PostUpdate(ctx, postOwnerValidateUsecase, postUpdateUsecase)
}

func (di *DIContainer) PostDeleteController(ctx *gin.Context) {
	repository := repository.NewPostRepository(controller.DB(ctx))
	ownerUsecase := usecase.NewPostOwnerValidateUsecase(repository)
	deleteUsecase := usecase.NewPostDeleteUsecase(repository)
	controller.PostDelete(ctx, ownerUsecase, deleteUsecase)
}

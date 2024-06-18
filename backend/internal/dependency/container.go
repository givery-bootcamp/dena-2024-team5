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

func (di *DIContainer) UserCreateController(ctx *gin.Context) {
	repository := repositories.NewUserRepository(controllers.DB(ctx))
	usecase := usecases.NewUserCreateUsecase(repository)
	controllers.UserCreate(ctx, usecase)
}

func (di *DIContainer) AuthSignoutController(ctx *gin.Context) {
	controllers.AuthSignout(ctx)
}

func (di *DIContainer) UserGetMeController(ctx *gin.Context) {
	repository := repositories.NewUserRepository(controllers.DB(ctx))
	usecase := usecases.NewUserGetMeUsecase(repository)
	controllers.UserGetMe(ctx, usecase)
}

func (di *DIContainer) PostNewController(ctx *gin.Context) {
	repository := repositories.NewPostRepository(controllers.DB(ctx))
	usecase := usecases.NewPostNewUsecase(repository)
	controllers.PostNew(ctx, usecase)
}

func (di *DIContainer) PostUpdateController(ctx *gin.Context) {
	repository := repositories.NewPostRepository(controllers.DB(ctx))
	postUpdateUsecase := usecases.NewPostUpdateUsecase(repository)
	postOwnerValidateUsecase := usecases.NewPostOwnerValidateUsecase(repository)
	controllers.PostUpdate(ctx, postOwnerValidateUsecase, postUpdateUsecase)
}

func (di *DIContainer) PostDeleteController(ctx *gin.Context) {
	repository := repositories.NewPostRepository(controllers.DB(ctx))
	ownerUsecase := usecases.NewPostOwnerValidateUsecase(repository)
	deleteUsecase := usecases.NewPostDeleteUsecase(repository)
	controllers.PostDelete(ctx, ownerUsecase, deleteUsecase)
}

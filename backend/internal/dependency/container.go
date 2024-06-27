package dependency

import (
	"myapp/internal/constant"
	"myapp/internal/controller"
	r "myapp/internal/repository"
	"myapp/internal/sse"
	u "myapp/internal/usecase"

	"github.com/gin-gonic/gin"
)

type DIContainer struct{}

func NewDIContainer() *DIContainer {
	return &DIContainer{}
}

func (di *DIContainer) PostGetListController(ctx *gin.Context) {
	repository := r.NewPostRepository(controller.DB(ctx))
	usecase := u.NewPostGetListUsecase(repository)
	controller.PostGetList(ctx, usecase)
}

func (di *DIContainer) PostGetDetailController(ctx *gin.Context) {
	repository := r.NewPostRepository(controller.DB(ctx))
	usecase := u.NewPostGetDetailUsecase(repository)
	controller.PostGetDetail(ctx, usecase)
}

func (di *DIContainer) AuthSigninController(ctx *gin.Context) {
	repository := r.NewUserRepository(controller.DB(ctx))
	usecase := u.NewAuthSigninUsecase(repository)
	controller.AuthSignin(ctx, usecase)
}

func (di *DIContainer) UserCreateController(ctx *gin.Context) {
	repository := r.NewUserRepository(controller.DB(ctx))
	usecase := u.NewUserCreateUsecase(repository)
	controller.UserCreate(ctx, usecase)
}

func (di *DIContainer) AuthSignoutController(ctx *gin.Context) {
	controller.AuthSignout(ctx)
}

func (di *DIContainer) UserGetMeController(ctx *gin.Context) {
	repository := r.NewUserRepository(controller.DB(ctx))
	usecase := u.NewUserGetMeUsecase(repository)
	controller.UserGetMe(ctx, usecase)
}

func (di *DIContainer) PostNewController(ctx *gin.Context) {
	repository := r.NewPostRepository(controller.DB(ctx))
	usecase := u.NewPostNewUsecase(repository)
	controller.PostNew(ctx, usecase)
}

func (di *DIContainer) PostUpdateController(ctx *gin.Context) {
	repository := r.NewPostRepository(controller.DB(ctx))
	postUpdateUsecase := u.NewPostUpdateUsecase(repository)
	postOwnerValidateUsecase := u.NewPostOwnerValidateUsecase(repository)
	controller.PostUpdate(ctx, postOwnerValidateUsecase, postUpdateUsecase)
}

func (di *DIContainer) PostDeleteController(ctx *gin.Context) {
	repository := r.NewPostRepository(controller.DB(ctx))
	ownerUsecase := u.NewPostOwnerValidateUsecase(repository)
	deleteUsecase := u.NewPostDeleteUsecase(repository)
	controller.PostDelete(ctx, ownerUsecase, deleteUsecase)
}

func (di *DIContainer) CommentNewController(ctx *gin.Context) {
	broker, ok := ctx.MustGet(constant.NOTIFICATION_BROKER_KEY).(*sse.Broker)
	if !ok {
		ctx.JSON(500, gin.H{"error": "internal server error"})
		return
	}

	commentRepository := r.NewCommentRepository(controller.DB(ctx))
	postRepository := r.NewPostRepository(controller.DB(ctx))

	commentNewUsecase := u.NewCommentNewUsecase(commentRepository)
	notificationMessageUsecase := u.NewNotificationMessageUsecase(broker)
	postGetDetailUsecase := u.NewPostGetDetailUsecase(postRepository)

	controller.CommentNew(ctx, commentNewUsecase, notificationMessageUsecase, postGetDetailUsecase)
}

func (di *DIContainer) CommentUpdateController(ctx *gin.Context) {
	commentRepository := r.NewCommentRepository(controller.DB(ctx))
	ownerUsecase := u.NewCommentOwnerValidateUsecase(commentRepository)
	commentUpdateUsecase := u.NewCommentUpdateUsecase(commentRepository)
	controller.CommentUpdate(ctx, ownerUsecase, commentUpdateUsecase)
}

func (di *DIContainer) CommentDeleteController(ctx *gin.Context) {
	commentRepository := r.NewCommentRepository(controller.DB(ctx))
	ownerUsecase := u.NewCommentOwnerValidateUsecase(commentRepository)
	commentDeleteUsecase := u.NewCommentDeleteUsecase(commentRepository)
	controller.CommentDelete(ctx, ownerUsecase, commentDeleteUsecase)
}

func (di *DIContainer) PostLikeAddController(ctx *gin.Context) {
	broker, ok := ctx.MustGet(constant.NOTIFICATION_BROKER_KEY).(*sse.Broker)
	if !ok {
		ctx.JSON(500, gin.H{"error": "internal server error"})
		return
	}

	likeRepository := r.NewLikeRepository(controller.DB(ctx))
	commentRepository := r.NewCommentRepository(controller.DB(ctx))
	postRepository := r.NewPostRepository(controller.DB(ctx))
	userRepository := r.NewUserRepository(controller.DB(ctx))

	postLikeAddUsecase := u.NewPostLikeAddUsecase(likeRepository)
	commentZombieUsecase := u.NewCommentNewByZombieUsecase(commentRepository, userRepository)
	notificationMessageUsecase := u.NewNotificationMessageUsecase(broker)
	postGetDetailUsecase := u.NewPostGetDetailUsecase(postRepository)

	controller.PostLikeAdd(ctx, postLikeAddUsecase, commentZombieUsecase, notificationMessageUsecase, postGetDetailUsecase)
}

package controllers

import (
	"myapp/internal/repositories"
	"myapp/internal/usecases"

	"github.com/gin-gonic/gin"
)

func GetListInternal(ctx *gin.Context, usecase *usecases.PostGetListUsecase) {
	result, err := usecase.Execute()
	if err != nil {
		handleError(ctx, 500, err)
		return
	}
	ctx.JSON(200, result)
}

// Get List Posts

// @Summary get list posts
// @Description 投稿一覧を取得します
// @Tags posts
// @Accept json
// @Produce json
// @Success 200 {object} []entities.Post
// @Failure 500 {object} controllers.ErrorResponse
// @Router /posts [get]
func GetList(ctx *gin.Context) {
	repository := repositories.NewPostRepository(DB(ctx))
	usecase := usecases.NewPostGetListUsecase(repository)
	GetListInternal(ctx, usecase)
}

package controller

import (
	"errors"
	"myapp/internal/usecase"
	"net/http"

	"github.com/gin-gonic/gin"
)

// Get List Posts
// @Summary get list posts
// @Description 投稿一覧を取得します
// @Tags posts
// @Accept json
// @Produce json
// @Success 200 {object} []entity.Post
// @Failure 500 {object} controller.ErrorResponse
// @Router /posts [get]
func PostGetList(ctx *gin.Context, usecase *usecase.PostGetListUsecase) {
	if usecase == nil {
		handleError(ctx, http.StatusInternalServerError, errors.New("ぬるぽ"))
		return
	}
	result, err := usecase.Execute()
	if err != nil {
		handleError(ctx, http.StatusInternalServerError, err)
		return
	}
	ctx.JSON(http.StatusOK, result)
}

package controller

import (
	"errors"
	"myapp/internal/usecase"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

// @Summary get post detail
// @Description	投稿の詳細を取得します
// @Tags	posts
// @Accept	json
// @Produce	json
// @Param	postID	path	int		true	"Post ID"
// @Success	200		{object}	entity.Post
// @Failure	400		{object}	controller.ErrorResponse
// @Failure	404		{object}	controller.ErrorResponse
// @Failure	500		{object}	controller.ErrorResponse
// @Router	/posts/{postID}	[get]
func PostGetDetail(ctx *gin.Context, usecase *usecase.PostGetDetailUsecase) {
	if usecase == nil {
		handleError(ctx, http.StatusInternalServerError, errors.New("ぬるぽ"))
		return
	}
	postIDStr := ctx.Param("postID")
	postID, err := strconv.ParseUint(postIDStr, 10, 64)
	if err != nil {
		handleError(ctx, http.StatusBadRequest, err)
		return
	}
	result, err := usecase.Execute(uint(postID))
	if err != nil {
		handleError(ctx, http.StatusInternalServerError, err)
		return
	}
	if result == nil {
		handleError(ctx, http.StatusNotFound, errors.New("Invalid post ID"))
		return
	}
	ctx.JSON(http.StatusOK, result)
}

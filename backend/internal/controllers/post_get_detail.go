package controllers

import (
	"errors"
	"myapp/internal/usecases"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

// @Summary get post detail
// @Description	投稿の詳細を取得します
// @Tags	posts
// @Accept	json
// @Produce	json
// @Param	postID	path	int		true	"Post ID"
// @Success	200		{object}	entities.Post
// @Failure	400		{object}	controllers.ErrorResponse
// @Failure	404		{object}	controllers.ErrorResponse
// @Failure	500		{object}	controllers.ErrorResponse
// @Router	/posts/{postID}	[get]
func PostGetDetail(ctx *gin.Context, usecase *usecases.PostGetDetailUsecase) {
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
		if errors.Is(err, gorm.ErrRecordNotFound) {
			handleError(ctx, http.StatusNotFound, err)
		} else {
			handleError(ctx, http.StatusInternalServerError, err)
		}
		return
	}
	ctx.JSON(http.StatusOK, result)
}

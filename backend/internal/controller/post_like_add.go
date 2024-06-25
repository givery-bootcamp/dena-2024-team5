package controller

import (
	"errors"
	"myapp/internal/constant"
	u "myapp/internal/usecase"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

// Add like to a post
// @Summary get list posts
// @Description 投稿に対して、いいねを付与します。
// @Tags posts
// @Produce json
// @Success 204
// @Failure 400 {object} controller.ErrorResponse
// @Failure 409 {object} controller.ErrorResponse その投稿に既にいいねしているとき
// @Failure 500 {object} controller.ErrorResponse
// @Router /posts/{postID}/like [post]
func PostLikeAdd(ctx *gin.Context, usecase *u.PostLikeAddUsecase) {
	if usecase == nil {
		handleError(ctx, http.StatusInternalServerError, errors.New("ぬるぽ"))
		return
	}

	// jwtからuserIDを取る
	userID, ok := ctx.Value(constant.GIN_CONTEXT_USERID).(uint)
	if !ok {
		handleError(ctx, http.StatusBadRequest, errors.New("user id not found"))
		return
	}

	// pathからpostIDを取る
	postIDStr := ctx.Param("postID")
	postID64, err := strconv.ParseUint(postIDStr, 10, 64)
	if err != nil {
		handleError(ctx, http.StatusBadRequest, err)
		return
	}
	postID := uint(postID64)

	err = usecase.Execute(userID, postID)
	if err != nil {
		if errors.Is(err, u.RecordConflictError) {
			handleError(ctx, http.StatusConflict, err)
		} else {
			handleError(ctx, http.StatusInternalServerError, err)
		}
		return
	}
	ctx.Status(http.StatusNoContent)
}

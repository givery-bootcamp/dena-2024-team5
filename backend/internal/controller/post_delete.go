package controller

import (
	"errors"
	"myapp/internal/constant"
	"myapp/internal/usecase"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

// Delete post
// @Summary delete post API
// @Description 投稿を削除する
// @Tags posts
// @Success 204
// @Failure 400 {object} controller.ErrorResponse	対象の投稿の作成者が自分ではない場合も400となる
// @Failure 500 {object} controller.ErrorResponse
// @Router /posts/{postID} [delete]
func PostDelete(
	ctx *gin.Context,
	ownerUsecase *usecase.PostOwnerValidateUsecase,
	deleteUsecase *usecase.PostDeleteUsecase,
) {
	if ownerUsecase == nil || deleteUsecase == nil {
		handleError(ctx, http.StatusInternalServerError, errors.New("ぬるぽ"))
		return
	}
	// Get parameters
	userID, ok := ctx.Value(constant.GIN_CONTEXT_USERID).(uint)
	if !ok {
		handleError(ctx, http.StatusBadRequest, errors.New("User ID not found"))
		return
	}
	postIDStr := ctx.Param("postID")
	postID, err := strconv.ParseUint(postIDStr, 10, 64)
	if err != nil {
		handleError(ctx, http.StatusBadRequest, errors.New("{postID} must be uint."))
		return
	}
	// Check post owner
	ok, err = ownerUsecase.Execute(userID, uint(postID))
	if err != nil {
		if errors.Is(err, usecase.RecordNotFoundError) {
			handleError(ctx, http.StatusNotFound, err)
		} else {
			handleError(ctx, http.StatusInternalServerError, err)
		}
		return
	}
	if !ok {
		handleError(ctx, http.StatusBadRequest, errors.New("You are NOT an owner of this post."))
		return
	}
	// Delete post
	err = deleteUsecase.Execute(uint(postID))
	if err != nil {
		handleError(ctx, http.StatusInternalServerError, err)
		return
	}
	ctx.Status(http.StatusNoContent)
}

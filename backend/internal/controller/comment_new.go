package controller

import (
	"errors"
	"myapp/internal/constant"
	"myapp/internal/usecase"
	"net/http"

	"github.com/gin-gonic/gin"
)

type CommentNewReq struct {
	PostID uint   `json:"postId" binding:"required"`
	Body   string `json:"body" binding:"required"`
}

// New comment
// @Summary new comment API
// @Description サインインしているユーザーで、指定された投稿に、本文のコメントを作成する
// @Tags comments
// @Accept json
// @Param commentNew body controller.CommentNewReq true "リクエストパラメータ"
// @Success 204
// @Failure 400 {object} controller.ErrorResponse
// @Failure 500 {object} controller.ErrorResponse
// @Router /comments [post]
func CommentNew(
	ctx *gin.Context,
	postAvailableUsecase *usecase.PostAvailableUsecase,
	commentNewUsecase *usecase.CommentNewUsecase,
) {
	if commentNewUsecase == nil {
		handleError(ctx, http.StatusInternalServerError, errors.New("ぬるぽ"))
		return
	}

	// jwtからユーザーID取る
	userID, ok := ctx.Value(constant.GIN_CONTEXT_USERID).(uint)
	if !ok {
		handleError(ctx, http.StatusBadRequest, errors.New("user id not found"))
		return
	}

	var req CommentNewReq
	err := ctx.ShouldBindJSON(&req)
	if err != nil {
		handleError(ctx, http.StatusBadRequest, err)
		return
	}

	// postの存在確認
	ok, err = postAvailableUsecase.Execute(req.PostID)
	if err != nil {
		handleError(ctx, http.StatusInternalServerError, err)
		return
	}
	if !ok {
		handleError(ctx, http.StatusBadRequest, errors.New("invalid post ID"))
		return
	}

	err = commentNewUsecase.Execute(userID, req.PostID, req.Body)
	if err != nil {
		handleError(ctx, http.StatusInternalServerError, err)
		return
	}
	ctx.Status(http.StatusNoContent)
}

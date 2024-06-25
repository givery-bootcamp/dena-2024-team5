package controller

import (
	"errors"
	"myapp/internal/constant"
	"myapp/internal/usecase"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

type CommentUpdateReq struct {
	Body string `json:"body" binding:"required"`
}

// Update comment
// @Summary update comment API
// @Description サインインしているユーザーで、指定されたコメントを更新する
// @Tags comments
// @Accept json
// @Param commentUpdate body controller.CommentUpdateReq true "リクエストパラメータ"
// @Success 204
// @Failure	400	{object}	controller.ErrorResponse
// @Failure	403	{object}	controller.ErrorResponse
// @Failure	404	{object}	controller.ErrorResponse
// @Failure	500	{object}	controller.ErrorResponse
// @Router /comments/{commentID} [put]
func CommentUpdate(
	ctx *gin.Context,
	ownerUsecase *usecase.CommentOwnerValidateUsecase,
	commentUpdateUsecase *usecase.CommentUpdateUsecase,
) {
	if ownerUsecase == nil || commentUpdateUsecase == nil {
		handleError(ctx, http.StatusInternalServerError, errors.New("ぬるぽ"))
		return
	}

	// jwtからuserIDを取る
	userID, ok := ctx.Value(constant.GIN_CONTEXT_USERID).(uint)
	if !ok {
		handleError(ctx, http.StatusBadRequest, errors.New("user id not found"))
		return
	}

	// pathからcommentIDを取る
	commentIDStr := ctx.Param("commentID")
	commentID64, err := strconv.ParseUint(commentIDStr, 10, 64)
	if err != nil {
		handleError(ctx, http.StatusBadRequest, err)
		return
	}
	commentID := uint(commentID64)

	// request bodyをパース
	var req CommentUpdateReq
	err = ctx.ShouldBindJSON(&req)
	if err != nil {
		handleError(ctx, http.StatusBadRequest, err)
		return
	}

	// commentの作成者をチェック
	ok, err = ownerUsecase.Execute(userID, commentID)
	if err != nil {
		if errors.Is(err, usecase.RecordNotFoundError) {
			handleError(ctx, http.StatusNotFound, errors.New("No such comment"))
		} else {
			handleError(ctx, http.StatusInternalServerError, err)
		}
		return
	}
	if !ok {
		handleError(ctx, http.StatusForbidden, errors.New("You are NOT an owner of this comment"))
		return
	}

	// メイン処理。コメントの更新
	err = commentUpdateUsecase.Execute(commentID, req.Body)
	if err != nil {
		handleError(ctx, http.StatusInternalServerError, err)
		return
	}
	ctx.Status(http.StatusNoContent)
}

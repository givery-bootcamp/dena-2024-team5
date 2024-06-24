package controller

import (
	"errors"
	"myapp/internal/constant"
	"myapp/internal/usecase"
	"net/http"

	"github.com/gin-gonic/gin"
)

type PostNewReq struct {
	Title string `json:"title" binding:"required,max=100" maxLength:"100"`
	Body  string `json:"body" binding:"required"`
}

// New post
// @Summary new post API
// @Description サインインしているユーザーで、指定されたタイトル、本文の投稿を作成する
// @Tags posts
// @Accept json
// @Param signinPost body controller.PostNewReq true "リクエストパラメータ"
// @Success 204
// @Failure 400 {object} controller.ErrorResponse
// @Failure 500 {object} controller.ErrorResponse
// @Router /posts [post]
func PostNew(ctx *gin.Context, usecase *usecase.PostNewUsecase) {
	if usecase == nil {
		handleError(ctx, http.StatusInternalServerError, errors.New("ぬるぽ"))
		return
	}
	var req PostNewReq
	err := ctx.ShouldBindJSON(&req)
	if err != nil {
		handleError(ctx, http.StatusBadRequest, err)
		return
	}
	userID, ok := ctx.Value(constant.GIN_CONTEXT_USERID).(uint)
	if !ok {
		handleError(ctx, http.StatusBadRequest, errors.New("user id not found"))
		return
	}
	err = usecase.Execute(userID, req.Title, req.Body)
	if err != nil {
		handleError(ctx, http.StatusInternalServerError, err)
		return
	}
	ctx.Status(http.StatusNoContent)
}

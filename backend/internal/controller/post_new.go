package controller

import (
	"errors"
	"fmt"
	"mime/multipart"
	"myapp/internal/constant"
	"myapp/internal/usecase"
	"net/http"

	"github.com/gin-gonic/gin"
)

type PostNewReq struct {
	Title string                `form:"title" binding:"required,max=100" maxLength:"100"`
	Body  string                `form:"body" binding:"required"`
	Image *multipart.FileHeader `form:"image"`
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
	err := ctx.ShouldBind(&req)
	if err != nil {
		handleError(ctx, http.StatusBadRequest, fmt.Errorf("failed to parse request: %w", err))
		return
	}

	userID, ok := ctx.Value(constant.GIN_CONTEXT_USERID).(uint)
	if !ok {
		handleError(ctx, http.StatusBadRequest, errors.New("user id not found"))
		return
	}

	var file multipart.File

	if req.Image != nil {
		file, err = req.Image.Open()
		if err != nil {
			handleError(ctx, http.StatusBadRequest, fmt.Errorf("failed to open file: %w", err))
			return
		}
	}

	err = usecase.Execute(userID, req.Title, req.Body, file)
	if err != nil {
		handleError(ctx, http.StatusInternalServerError, err)
		return
	}
	ctx.Status(http.StatusNoContent)
}

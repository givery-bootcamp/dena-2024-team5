package controllers

import (
	"errors"
	"myapp/internal/constants"
	"myapp/internal/usecases"
	"net/http"

	"github.com/gin-gonic/gin"
)

type PostNewReq struct {
	Title string `json:"title" maxLength:"100"`
	Body  string `json:"body"`
}

// New post
// @Summary new post API
// @Description サインインしているユーザーで、指定されたタイトル、本文の投稿を作成する
// @Tags posts
// @Accept json
// @Produce json
// @Param signinPost body controllers.PostNewReq true "リクエストパラメータ"
// @Success 200 {object} entities.Post
// @Failure 400 {object} controllers.ErrorResponse
// @Failure 500 {object} controllers.ErrorResponse
// @Router /posts [post]
func PostNew(ctx *gin.Context, usecase *usecases.PostNewUsecase) {
	if usecase == nil {
		handleError(ctx, http.StatusInternalServerError, errors.New("ぬるぽ"))
		return
	}
	var req PostNewReq
	err := ctx.BindJSON(&req)
	if err != nil {
		handleError(ctx, http.StatusBadRequest, err)
		return
	}
	userID, ok := ctx.Value(constants.GIN_CONTEXT_USERID).(uint)
	if !ok {
		handleError(ctx, http.StatusBadRequest, errors.New("user id not found"))
		return
	}
	post, err := usecase.Execute(userID, req.Title, req.Body)
	if err != nil {
		handleError(ctx, http.StatusInternalServerError, err)
		return
	}
	ctx.JSON(http.StatusOK, post)
}

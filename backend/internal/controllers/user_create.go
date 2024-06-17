package controllers

import (
	"errors"
	"myapp/internal/usecases"
	"net/http"

	"github.com/gin-gonic/gin"
)

type UserCreateReq struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

// User Post
// @Summary  Create User API
// @Description usernameとpasswordでuserを作成します。
// @Tags users
// @Accept json
// @Produce json
// @Param userCreate body controllers.UserCreateReq true "リクエストパラメータ"
// @Success 200 {object} entities.User
// @Failure 400 {object} controllers.ErrorResponse
// @Failure 409 {object} controllers.ErrorResponse
// @Failure 500 {object} controllers.ErrorResponse
// @Router /users [post]
func UserCreate(ctx *gin.Context, usecase *usecases.UserCreateUsecase) {
	if usecase == nil {
		handleError(ctx, http.StatusInternalServerError, errors.New("usecase is nil"))
		return
	}
	var req UserCreateReq
	err := ctx.BindJSON(&req)
	if err != nil {
		handleError(ctx, http.StatusBadRequest, err)
		return
	}

	if req.Username == "" {
		handleError(ctx, http.StatusBadRequest, errors.New("username is empty"))
		return
	}
	if req.Password == "" {
		handleError(ctx, http.StatusBadRequest, errors.New("password is empty"))
		return
	}

	result, err := usecase.Execute(req.Username, req.Password)
	if err != nil {
		handleError(ctx, http.StatusConflict, err)
		return
	}
	ctx.JSON(http.StatusOK, result)
}

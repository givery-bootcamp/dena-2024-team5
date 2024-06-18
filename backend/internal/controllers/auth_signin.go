package controllers

import (
	"errors"
	"myapp/internal/usecases"
	"net/http"

	"github.com/gin-gonic/gin"
)

type AuthSigninReq struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

// Signin
// @Summary singin API
// @Description usernameとpasswordでsigninします。
// @Tags auth
// @Accept json
// @Produce json
// @Param signinPost body controllers.AuthSigninReq true "リクエストパラメータ"
// @Success 200 {object} entities.User
// @Failure 400 {object} controllers.ErrorResponse
// @Failure 500 {object} controllers.ErrorResponse
// @Router /signin [post]
func AuthSignin(ctx *gin.Context, usecase *usecases.AuthSigninUsecase) {
	if usecase == nil {
		handleError(ctx, http.StatusInternalServerError, errors.New("ぬるぽ"))
		return
	}
	var req AuthSigninReq
	err := ctx.BindJSON(&req)
	if err != nil {
		handleError(ctx, http.StatusBadRequest, err)
		return
	}

	result, token, err := usecase.Execute(req.Username, req.Password)
	if err != nil {
		handleError(ctx, http.StatusBadRequest, err)
		return
	}
	// samesiteをnonemodeにする
	ctx.SetSameSite(http.SameSiteNoneMode)
	ctx.SetCookie("jwt", token, 60*60*24, "/", "localhost", false, false)
	ctx.JSON(http.StatusOK, result)
}

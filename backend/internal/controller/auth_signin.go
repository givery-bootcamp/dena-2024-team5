package controller

import (
	"errors"
	"myapp/internal/config"
	"myapp/internal/usecase"
	"net/http"

	"github.com/gin-gonic/gin"
)

type AuthSigninReq struct {
	Username string `json:"username" binding:"required"`
	Password string `json:"password" binding:"required"`
}

// Signin
// @Summary singin API
// @Description usernameとpasswordでsigninします。
// @Tags auth
// @Accept json
// @Produce json
// @Param signinPost body controller.AuthSigninReq true "リクエストパラメータ"
// @Success 200 {object} entity.User
// @Failure 400 {object} controller.ErrorResponse
// @Failure 500 {object} controller.ErrorResponse
// @Router /signin [post]
func AuthSignin(ctx *gin.Context, usecase *usecase.AuthSigninUsecase) {
	if usecase == nil {
		handleError(ctx, http.StatusInternalServerError, errors.New("ぬるぽ"))
		return
	}
	var req AuthSigninReq
	err := ctx.ShouldBindJSON(&req)
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
	ctx.SetCookie("jwt", token, 60*60*24, "/", config.Domain, false, false)
	ctx.JSON(http.StatusOK, result)
}

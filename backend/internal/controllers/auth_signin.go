package controllers

import (
	"errors"
	"fmt"
	"myapp/internal/usecases"
	"net/http"

	"github.com/gin-gonic/gin"
)

type AuthSigninReq struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

// Signin
// @Summary singin
// @Description signinします
// @Tags sign
// @Accept json
// @Produce json
// @Success 200 {object} []entities.Post
// @Failure 500 {object} controllers.ErrorResponse
// @Router /signin [post]
func AuthSignin(ctx *gin.Context, usecase *usecases.AuthSigninUsecase) {
	if usecase == nil {
		handleError(ctx, http.StatusInternalServerError, errors.New("ぬるぽ"))
		return
	}
	var req AuthSigninReq
	ctx.BindJSON(&req)
	// ctx.JSON(200, req)
	fmt.Println(req)

	result, token, err := usecase.Execute(req.Username, req.Password)
	fmt.Println(token)
	if err != nil {
		handleError(ctx, http.StatusInternalServerError, err)
		return
	}
	// samesiteをnonemodeにする
	ctx.SetSameSite(http.SameSiteNoneMode)
	ctx.SetCookie("jwt", token, 60*60*24, "/", "localhost", false, false)
	ctx.JSON(http.StatusOK, result)
}

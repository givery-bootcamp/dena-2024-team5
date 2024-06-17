package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func AuthSignout(ctx *gin.Context) {
	token, err := ctx.Cookie("jwt")
	if err != nil {
		handleError(ctx, http.StatusBadRequest, err)
		return
	}
	ctx.SetCookie("jwt", token, 0, "/", "localhost", false, false)
	ctx.Status(http.StatusNoContent)
}

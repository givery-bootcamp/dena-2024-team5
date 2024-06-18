package controllers

import (
	"errors"
	"myapp/internal/constants"
	"myapp/internal/usecases"
	"net/http"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

// @Summary get user me
// @Description	ログインしているユーザーの情報を取得します
// @Tags	users
// @Accept	json
// @Produce	json
// @Success	200		{object}	entities.User
// @Failure	401		{object}	controllers.ErrorResponse
// @Failure	404		{object}	controllers.ErrorResponse
// @Failure	500		{object}	controllers.ErrorResponse
// @Router	/users/me	[get]
func UserGetMe(ctx *gin.Context, usecase *usecases.UserGetMeUsecase) {
	if usecase == nil {
		handleError(ctx, http.StatusInternalServerError, errors.New("ぬるぽ"))
		return
	}

	id, ok := ctx.Value(constants.GIN_CONTEXT_USERID).(uint)
	if !ok {
		handleError(ctx, http.StatusBadRequest, errors.New("user id not found"))
		return
	}
	result, err := usecase.Execute(id)
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			handleError(ctx, http.StatusNotFound, err)
		} else {
			handleError(ctx, http.StatusInternalServerError, err)
		}
		return
	}
	ctx.JSON(http.StatusOK, result)
}

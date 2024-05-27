package controllers

import (
	"myapp/internal/repositories"
	"myapp/internal/usecases"

	"github.com/gin-gonic/gin"
)

func GetListInternal(ctx *gin.Context, usecase *usecases.PostGetListUsecase)  {
	result, err := usecase.Execute()
	if err != nil {
		handleError(ctx, 500, err)
		return
	}
	ctx.JSON(200, result)
}

func GetList(ctx *gin.Context) {
	repository := repositories.NewPostRepository(DB(ctx))
	usecase := usecases.NewPostGetListUsecase(repository)
	GetListInternal(ctx, usecase)
}

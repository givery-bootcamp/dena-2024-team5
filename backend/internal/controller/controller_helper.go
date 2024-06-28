package controller

import (
	"myapp/internal/constant"

	"github.com/aws/aws-sdk-go-v2/service/s3"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type ErrorResponse struct {
	Message string `json:"message"`
}

func DB(ctx *gin.Context) *gorm.DB {
	return ctx.MustGet("db").(*gorm.DB)
}

func S3Client(ctx *gin.Context) *s3.Client {
	return ctx.MustGet(constant.CONTEXT_AWS_S3_CLIENT).(*s3.Client)
}

func handleError(ctx *gin.Context, status int, err error) {
	res := ErrorResponse{
		Message: err.Error(),
	}
	ctx.JSON(status, &res)
}

func HandleErrorAbort(ctx *gin.Context, status int, err error) {
	res := ErrorResponse{
		Message: err.Error(),
	}
	ctx.AbortWithStatusJSON(status, &res)
}

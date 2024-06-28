package middleware

import (
	"myapp/internal/constant"
	"myapp/internal/external"

	"github.com/gin-gonic/gin"
)

func AWS() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		ctx.Set(constant.CONTEXT_AWS_S3_CLIENT, external.S3Client)
		ctx.Next()
	}
}

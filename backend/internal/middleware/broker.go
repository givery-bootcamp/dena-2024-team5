package middleware

import (
	"myapp/internal/constant"
	"myapp/internal/sse"

	"github.com/gin-gonic/gin"
)

func NotificationBroker(broker *sse.Broker) gin.HandlerFunc {
	return func(ctx *gin.Context) {
		ctx.Set(constant.NOTIFICATION_BROKER_KEY, broker)
		ctx.Next()
	}
}

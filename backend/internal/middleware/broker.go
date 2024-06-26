package middleware

import (
	"myapp/internal/constant"
	"myapp/internal/util/channel"

	"github.com/gin-gonic/gin"
)

func NotificationBroker(broker *channel.Broker) gin.HandlerFunc {
	return func(ctx *gin.Context) {
		ctx.Set(constant.NOTIFICATION_BROKER_KEY, broker)
		ctx.Next()
	}
}

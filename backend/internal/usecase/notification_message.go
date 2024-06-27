package usecase

import (
	"myapp/internal/sse"
)

type NotificationMessageUsecase struct {
	broker *sse.Broker
}

func NewNotificationMessageUsecase(broker *sse.Broker) *NotificationMessageUsecase {
	return &NotificationMessageUsecase{
		broker: broker,
	}
}

func (c *NotificationMessageUsecase) Execute(userID uint, message string) error {
	return c.broker.SendNotification(sse.Messager{
		UserID:  userID,
		Message: message,
	})
}

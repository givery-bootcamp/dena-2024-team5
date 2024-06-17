package interfaces

import (
	"myapp/internal/entities"
)

type PostGetDetailRepository interface {
	GetDetail(id uint) (*entities.Post, error)
}

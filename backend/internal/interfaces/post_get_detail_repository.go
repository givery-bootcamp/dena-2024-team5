package interfaces

import (
	"myapp/internal/entity"
)

type PostGetDetailRepository interface {
	GetDetail(id uint) (*entity.Post, error)
}

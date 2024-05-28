package interfaces

import (
	"myapp/internal/entities"
)

type PostGetDetailRepository interface {
	GetDetail(id int) (*entities.Post, error)
}

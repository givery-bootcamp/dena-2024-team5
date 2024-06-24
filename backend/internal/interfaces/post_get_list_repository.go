package interfaces

import (
	"myapp/internal/entity"
)

type PostGetListRepository interface {
	GetList() ([]entity.Post, error)
}

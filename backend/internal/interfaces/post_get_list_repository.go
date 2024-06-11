package interfaces

import (
	"myapp/internal/entities"
)

type PostGetListRepository interface {
	GetList() ([]entities.Post, error)
}

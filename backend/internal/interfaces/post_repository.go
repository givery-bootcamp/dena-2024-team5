package interfaces

import (
	"myapp/internal/entities"
)

type PostRepository interface {
	GetList() ([]entities.Post, error)
	GetDetail(id int) (*entities.Post, error)
}

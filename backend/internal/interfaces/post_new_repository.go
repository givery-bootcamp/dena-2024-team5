package interfaces

import (
	"myapp/internal/entities"
)

type PostNewRepository interface {
	PostNew(userId uint, title, body string) (*entities.Post, error)
}

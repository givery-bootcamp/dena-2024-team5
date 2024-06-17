package interfaces

import (
	"myapp/internal/entities"
)

type UserPostRepository interface {
	Post(username, password string) (*entities.User, error)
}

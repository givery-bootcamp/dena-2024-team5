package interfaces

import (
	"myapp/internal/entities"
)

type UserCreateRepository interface {
	Create(username, password string) (*entities.User, error)
}

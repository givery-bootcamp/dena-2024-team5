package interfaces

import (
	"myapp/internal/entities"
)

type UserRepository interface {
	GetByUsernameAndPassword(username, password string) (*entities.User, error)
}

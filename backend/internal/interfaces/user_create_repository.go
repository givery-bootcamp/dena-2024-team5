package interfaces

import (
	"myapp/internal/entity"
)

type UserCreateRepository interface {
	Create(username, password string) (*entity.User, error)
}

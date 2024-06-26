package interfaces

import (
	"myapp/internal/entity"
)

type UserGetByNameRepository interface {
	GetByName(name string) (*entity.User, error)
}

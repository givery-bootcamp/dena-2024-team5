package interfaces

import (
	"myapp/internal/entity"
)

type UserRepository interface {
	GetByUsernameAndPassword(username, password string) (*entity.User, error)
}

type UserGetDetailRepository interface {
	GetDetail(id uint) (*entity.User, error)
}

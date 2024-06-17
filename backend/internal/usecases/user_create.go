package usecases

import (
	"myapp/internal/entities"
	"myapp/internal/interfaces"
)

type UserCreateUsecase struct {
	repository interfaces.UserCreateRepository
}

func NewUserCreateUsecase(r interfaces.UserCreateRepository) *UserCreateUsecase {
	return &UserCreateUsecase{
		repository: r,
	}
}

func (a *UserCreateUsecase) Execute(username, password string) (*entities.User, error) {
	return a.repository.Create(username, password)
}

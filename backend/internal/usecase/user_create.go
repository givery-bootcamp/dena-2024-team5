package usecase

import (
	"myapp/internal/entity"
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

func (a *UserCreateUsecase) Execute(username, password string) (*entity.User, error) {
	return a.repository.Create(username, password)
}

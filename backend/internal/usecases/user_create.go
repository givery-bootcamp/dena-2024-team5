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
	user, err := a.repository.Create(username, password)
	if err != nil {
		return nil, err
	}

	return user, nil
}

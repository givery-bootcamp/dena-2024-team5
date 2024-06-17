package usecases

import (
	"myapp/internal/entities"
	"myapp/internal/interfaces"
)

type UserPostUsecase struct {
	repository interfaces.UserPostRepository
}

func NewUserPostUsecase(r interfaces.UserPostRepository) *UserPostUsecase {
	return &UserPostUsecase{
		repository: r,
	}
}

func (a *UserPostUsecase) Execute(username, password string) (*entities.User, error) {
	user, err := a.repository.Post(username, password)
	if err != nil {
		return nil, err
	}

	return user, nil
}

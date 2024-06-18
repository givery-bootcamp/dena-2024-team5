package usecases

import (
	"myapp/internal/entities"
	"myapp/internal/interfaces"
)

type PostNewUsecase struct {
	repository interfaces.PostNewRepository
}

func NewPostNewUsecase(r interfaces.PostNewRepository) *PostNewUsecase {
	return &PostNewUsecase{
		repository: r,
	}
}

func (p *PostNewUsecase) Execute(userId uint, title, body string) (*entities.Post, error) {
	return p.repository.PostNew(userId, title, body)
}

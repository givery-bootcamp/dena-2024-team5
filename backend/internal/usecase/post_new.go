package usecase

import (
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

func (p *PostNewUsecase) Execute(userID uint, title, body string) error {
	return p.repository.PostNew(userID, title, body)
}

package usecases

import (
	"myapp/internal/interfaces"
)

type PostUpdateUsecase struct {
	repository interfaces.PostUpdateRepository
}

func NewPostUpdateUsecase(r interfaces.PostUpdateRepository) *PostUpdateUsecase {
	return &PostUpdateUsecase{
		repository: r,
	}
}

func (p *PostUpdateUsecase) Execute(postID uint, title, body string) error {
	return p.repository.Update(postID, title, body)
}

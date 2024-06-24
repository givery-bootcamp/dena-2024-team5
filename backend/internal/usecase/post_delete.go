package usecase

import (
	"myapp/internal/interfaces"
)

type PostDeleteUsecase struct {
	repository interfaces.PostDeleteRepository
}

func NewPostDeleteUsecase(r interfaces.PostDeleteRepository) *PostDeleteUsecase {
	return &PostDeleteUsecase{
		repository: r,
	}
}

func (p *PostDeleteUsecase) Execute(postID uint) error {
	return p.repository.PostDelete(postID)
}

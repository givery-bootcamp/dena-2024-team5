package usecase

import (
	"myapp/internal/entity"
	"myapp/internal/interfaces"
)

type PostGetDetailUsecase struct {
	repository interfaces.PostGetDetailRepository
}

func NewPostGetDetailUsecase(r interfaces.PostGetDetailRepository) *PostGetDetailUsecase {
	return &PostGetDetailUsecase{
		repository: r,
	}
}

func (p *PostGetDetailUsecase) Execute(id uint) (*entity.Post, error) {
	return p.repository.GetDetail(id)
}

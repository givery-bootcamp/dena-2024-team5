package usecases

import (
	"myapp/internal/entities"
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

func (p *PostGetDetailUsecase) Execute(id int) (*entities.Post, error) {
	return p.repository.GetDetail(id)
}

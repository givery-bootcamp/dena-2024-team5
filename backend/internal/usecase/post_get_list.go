package usecase

import (
	"myapp/internal/entity"
	"myapp/internal/interfaces"
)

type PostGetListUsecase struct {
	repository interfaces.PostGetListRepository
}

func NewPostGetListUsecase(r interfaces.PostGetListRepository) *PostGetListUsecase {
	return &PostGetListUsecase{
		repository: r,
	}
}

func (p *PostGetListUsecase) Execute() ([]entity.Post, error) {
	return p.repository.GetList()
}

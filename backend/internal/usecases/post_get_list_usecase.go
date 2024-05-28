package usecases

import (
	"myapp/internal/entities"
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

func (p *PostGetListUsecase) Execute() (*[]entities.Post, error) {
	return p.repository.GetList()
}

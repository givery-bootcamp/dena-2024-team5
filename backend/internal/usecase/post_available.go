package usecase

import (
	"myapp/internal/interfaces"
)

type PostAvailableUsecase struct {
	repository interfaces.PostGetDetailRepository
}

func NewPostAvailableUsecase(r interfaces.PostGetDetailRepository) *PostAvailableUsecase {
	return &PostAvailableUsecase{
		repository: r,
	}
}

func (p *PostAvailableUsecase) Execute(postID uint) (bool, error) {
	post, err := p.repository.GetDetail(postID)
	if err != nil {
		return false, err
	}
	return post != nil, nil
}

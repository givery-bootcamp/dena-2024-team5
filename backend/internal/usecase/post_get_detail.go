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

// idに該当するpostがないとき、返り値は (nil, nil) になる。
// errorはこれ以外の内部エラーが起きたときだけ入る。
func (p *PostGetDetailUsecase) Execute(id uint) (*entity.Post, error) {
	return p.repository.GetDetail(id)
}

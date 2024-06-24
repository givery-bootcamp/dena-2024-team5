package usecase

import (
	"myapp/internal/entity"
	"myapp/internal/interfaces"
)

type UserGetMeUsecase struct {
	repository interfaces.UserGetDetailRepository
}

func NewUserGetMeUsecase(r interfaces.UserGetDetailRepository) *UserGetMeUsecase {
	return &UserGetMeUsecase{
		repository: r,
	}
}

func (p *UserGetMeUsecase) Execute(id uint) (*entity.User, error) {
	return p.repository.GetDetail(id)
}

package usecase

import (
	"myapp/internal/interfaces"
)

type PostOwnerValidateUsecase struct {
	repository interfaces.PostGetDetailRepository
}

func NewPostOwnerValidateUsecase(r interfaces.PostGetDetailRepository) *PostOwnerValidateUsecase {
	return &PostOwnerValidateUsecase{
		repository: r,
	}
}

func (p *PostOwnerValidateUsecase) Execute(userID, postID uint) (ok bool, err error) {
	post, err := p.repository.GetDetail(postID)
	if err != nil {
		return false, err
	}
	if post == nil {
		return false, RecordNotFoundError
	}
	return post.UserID == userID, nil
}

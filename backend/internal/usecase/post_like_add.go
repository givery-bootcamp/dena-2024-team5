package usecase

import "myapp/internal/interfaces"

type PostLikeAddUsecase struct {
	r interfaces.LikeAddRepository
}

func NewPostLikeAddUsecase(repository interfaces.LikeAddRepository) *PostLikeAddUsecase {
	return &PostLikeAddUsecase{
		r: repository,
	}
}

func (u *PostLikeAddUsecase) Execute(userID, postID uint) error {
	like, err := u.r.AddLike(userID, postID)
	if err != nil {
		return err
	}
	if like == nil {
		return RecordConflictError
	}
	return nil
}

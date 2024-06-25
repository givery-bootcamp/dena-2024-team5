package usecase

import "myapp/internal/interfaces"

type CommentDeleteUsecase struct {
	r interfaces.CommentDeleteRepository
}

func NewCommentDeleteUsecase(repository interfaces.CommentDeleteRepository) *CommentDeleteUsecase {
	return &CommentDeleteUsecase{
		r: repository,
	}
}

func (u *CommentDeleteUsecase) Execute(commentID uint) error {
	return u.r.CommentDelete(commentID)
}

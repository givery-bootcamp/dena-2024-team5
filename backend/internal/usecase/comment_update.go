package usecase

import (
	"myapp/internal/interfaces"
)

type CommentUpdateUsecase struct {
	r interfaces.CommentUpdateRepository
}

func NewCommentUpdateUsecase(repository interfaces.CommentUpdateRepository) *CommentUpdateUsecase {
	return &CommentUpdateUsecase{
		r: repository,
	}
}

func (u *CommentUpdateUsecase) Execute(commentID uint, body string) error {
	return u.r.CommentUpdate(commentID, body)
}

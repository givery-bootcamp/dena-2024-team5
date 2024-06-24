package usecase

import (
	"myapp/internal/interfaces"
)

type CommentNewUsecase struct {
	repository interfaces.CommentNewRepository
}

func NewCommentNewUsecase(r interfaces.CommentNewRepository) *CommentNewUsecase {
	return &CommentNewUsecase{
		repository: r,
	}
}

func (c *CommentNewUsecase) Execute(userID, postID uint, body string) error {
	return c.repository.CommentNew(userID, postID, body)
}

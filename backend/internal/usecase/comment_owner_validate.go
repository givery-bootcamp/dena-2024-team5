package usecase

import "myapp/internal/interfaces"

type CommentOwnerValidateUsecase struct {
	repository interfaces.CommentGetRepository
}

func NewCommentOwnerValidateUsecase(r interfaces.CommentGetRepository) *CommentOwnerValidateUsecase {
	return &CommentOwnerValidateUsecase{
		repository: r,
	}
}

func (c *CommentOwnerValidateUsecase) Execute(userID, commentID uint) (ok bool, err error) {
	comment, err := c.repository.GetDetail(commentID)
	if err != nil {
		return false, err
	}
	if comment == nil {
		return false, RecordNotFoundError
	}
	return comment.UserID == userID, nil
}

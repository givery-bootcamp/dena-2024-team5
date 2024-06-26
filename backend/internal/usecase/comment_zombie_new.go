package usecase

import (
	"myapp/internal/interfaces"
	"myapp/internal/util/zombie"
)

type CommentNewByZombieUsecase struct {
	commentRepository interfaces.CommentNewRepository
	userRepository    interfaces.UserGetByNameRepository
}

func NewCommentNewByZombieUsecase(
	commentRepository interfaces.CommentNewRepository,
	userRepository interfaces.UserGetByNameRepository,
) *CommentNewByZombieUsecase {
	return &CommentNewByZombieUsecase{
		commentRepository: commentRepository,
		userRepository:    userRepository,
	}
}

func (c *CommentNewByZombieUsecase) Execute(postID uint) error {
	name := zombie.RandomZombieName()
	user, err := c.userRepository.GetByName(name)
	if err != nil {
		return err
	}
	if user == nil {
		return RecordNotFoundError
	}

	return c.commentRepository.CommentNew(user.ID, postID, zombie.RandomZombieComment())
}

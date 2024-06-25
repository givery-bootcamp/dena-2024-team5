package usecase

import (
	"myapp/internal/interfaces"
	"myapp/internal/util/zombie"
)

type CommentNewByZombieUsecase struct {
	commentRepository interfaces.CommentNewRepository
	userRepository    interfaces.UserGetRandomZombieRepository
}

func NewCommentNewByZombieUsecase(
	commentRepository interfaces.CommentNewRepository,
	userRepository interfaces.UserGetRandomZombieRepository,
) *CommentNewByZombieUsecase {
	return &CommentNewByZombieUsecase{
		commentRepository: commentRepository,
		userRepository:    userRepository,
	}
}

func (c *CommentNewByZombieUsecase) Execute(postID uint) error {
	user, err := c.userRepository.GetRandomZombie()
	if err != nil {
		return err
	}
	if user == nil {
		return RecordNotFoundError
	}

	return c.commentRepository.CommentNew(user.ID, postID, zombie.RandomZombieComment())
}

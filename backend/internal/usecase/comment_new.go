package usecase

import (
	"myapp/internal/interfaces"
	"myapp/internal/util/channel"
)

type CommentNewUsecase struct {
	repository     interfaces.CommentNewRepository
	postRepository interfaces.PostGetDetailRepository
}

func NewCommentNewUsecase(
	r interfaces.CommentNewRepository,
	p interfaces.PostGetDetailRepository) *CommentNewUsecase {
	return &CommentNewUsecase{
		repository:     r,
		postRepository: p,
	}
}

func (c *CommentNewUsecase) Execute(broker *channel.Broker, userID, postID uint, body string) error {
	post, err := c.postRepository.GetDetail(postID, false)
	if err != nil {
		return err
	}

	broker.SendNotification(channel.Message{
		UserID:  post.UserID,
		PostID:  postID,
		Message: "コメントが追加されました",
	})
	return c.repository.CommentNew(userID, postID, body)
}

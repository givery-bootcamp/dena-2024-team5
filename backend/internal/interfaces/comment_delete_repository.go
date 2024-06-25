package interfaces

type CommentDeleteRepository interface {
	CommentDelete(commentID uint) error
}

package interfaces

type CommentUpdateRepository interface {
	CommentUpdate(commentID uint, body string) error
}

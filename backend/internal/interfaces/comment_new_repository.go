package interfaces

type CommentNewRepository interface {
	CommentNew(userID, postID uint, body string) error
}

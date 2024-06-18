package interfaces

type PostDeleteRepository interface {
	PostDelete(postID uint) error
}

package interfaces

type PostNewRepository interface {
	PostNew(userId uint, title, body string) error
}

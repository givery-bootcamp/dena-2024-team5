package interfaces

type PostNewRepository interface {
	PostNew(userID uint, title, body, imageUrl string) error
}

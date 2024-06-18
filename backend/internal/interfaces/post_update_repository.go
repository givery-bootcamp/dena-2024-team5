package interfaces

type PostUpdateRepository interface {
	Update(id uint, title, body string) error
}

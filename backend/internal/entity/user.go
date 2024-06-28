package entity

type UserType string

const (
	NormalUser UserType = "normal"
	ZombieUser UserType = "zombie"
)

type User struct {
	ID       uint     `json:"id"`
	Name     string   `json:"username"`
	UserType UserType `json:"user_type"`
}

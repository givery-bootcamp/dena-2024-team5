package interfaces

import "myapp/internal/entity"

type UserGetRandomZombieRepository interface {
	GetRandomZombie() (*entity.User, error)
}

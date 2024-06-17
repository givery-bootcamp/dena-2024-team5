package model

import (
	"myapp/internal/entities"

	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	Name     string
	Password string
}

func ConvertUserModelToEntity(p *User) *entities.User {
	return &entities.User{
		ID:   p.ID,
		Name: p.Name,
	}
}

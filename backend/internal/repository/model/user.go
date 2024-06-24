package model

import (
	"myapp/internal/entity"

	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	Name     string
	Password string
}

func ConvertUserModelToEntity(p *User) *entity.User {
	return &entity.User{
		ID:   p.ID,
		Name: p.Name,
	}
}

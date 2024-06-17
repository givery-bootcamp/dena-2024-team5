package model

import (
	"myapp/internal/entities"

	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	Id       int
	Name     string
	Password string
}

func ConvertUserModelToEntity(p *User) *entities.User {
	return &entities.User{
		Id:   p.Id,
		Name: p.Name,
	}
}

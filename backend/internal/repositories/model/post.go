package model

import (
	"myapp/internal/entities"

	"gorm.io/gorm"
)

type Post struct {
	gorm.Model
	Title  string
	Body   string
	UserID uint
	User   User
}

func ConvertPostModelToEntity(p *Post) *entities.Post {
	return &entities.Post{
		ID:        p.ID,
		Title:     p.Title,
		Body:      p.Body,
		UserID:    p.UserID,
		Username:  p.User.Name,
		CreatedAt: p.CreatedAt,
		UpdatedAt: p.UpdatedAt,
	}
}

package model

import (
	"myapp/internal/entity"

	"gorm.io/gorm"
)

type Post struct {
	gorm.Model
	Title  string
	Body   string
	UserID uint
	User   User
}

func ConvertPostModelToEntity(p *Post) *entity.Post {
	return &entity.Post{
		ID:        p.ID,
		Title:     p.Title,
		Body:      p.Body,
		UserID:    p.UserID,
		Username:  p.User.Name,
		CreatedAt: p.CreatedAt,
		UpdatedAt: p.UpdatedAt,
	}
}

package model

import (
	"myapp/internal/entity"

	"gorm.io/gorm"
)

type Comment struct {
	gorm.Model
	Body   string
	UserID uint
	User   User
	PostID uint
	Post   Post
}

func ConvertCommentModelToEntity(c *Comment) *entity.Comment {
	return &entity.Comment{
		ID:        c.ID,
		Body:      c.Body,
		UserID:    c.UserID,
		UserType:  c.User.UserType,
		PostID:    c.PostID,
		CreatedAt: c.CreatedAt,
		UpdatedAt: c.UpdatedAt,
	}
}

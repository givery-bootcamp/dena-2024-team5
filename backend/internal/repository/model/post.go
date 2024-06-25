package model

import (
	"myapp/internal/entity"

	"gorm.io/gorm"
)

type Post struct {
	gorm.Model
	Title    string
	Body     string
	UserID   uint
	User     User
	Comments []Comment
}

func ConvertPostModelToEntity(p *Post) *entity.Post {
	comments := make([]entity.Comment, len(p.Comments))
	for i, c := range p.Comments {
		comments[i] = *ConvertCommentModelToEntity(&c)
	}
	return &entity.Post{
		ID:        p.ID,
		Title:     p.Title,
		Body:      p.Body,
		UserID:    p.UserID,
		Username:  p.User.Name,
		Comments:  comments,
		CreatedAt: p.CreatedAt,
		UpdatedAt: p.UpdatedAt,
	}
}

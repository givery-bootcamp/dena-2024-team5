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
	ImageUrl string
	Comments []Comment
}

type PostWith struct {
	Post
	UserName  string
	LikeCount uint
}

func ConvertPostModelToEntity(p *PostWith) *entity.Post {
	comments := make([]entity.Comment, len(p.Comments))
	for i, c := range p.Comments {
		comments[i] = *ConvertCommentModelToEntity(&c)
	}
	return &entity.Post{
		ID:        p.ID,
		Title:     p.Title,
		Body:      p.Body,
		ImageUrl:  p.ImageUrl,
		UserID:    p.UserID,
		Comments:  comments,
		Username:  p.UserName,
		LikeCount: p.LikeCount,
		CreatedAt: p.CreatedAt,
		UpdatedAt: p.UpdatedAt,
	}
}

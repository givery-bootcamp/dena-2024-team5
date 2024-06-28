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
	ImageUrl string
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
		Comments:  []entity.Comment{},
		Username:  p.User.Name,
		CreatedAt: p.CreatedAt,
		UpdatedAt: p.UpdatedAt,
	}
}

type PostWith struct {
	Post
	LikeCount uint
}

func ConvertPostWithModelToEntity(p *PostWith) *entity.Post {
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
		Username:  p.User.Name,
		LikeCount: p.LikeCount,
		CreatedAt: p.CreatedAt,
		UpdatedAt: p.UpdatedAt,
	}
}

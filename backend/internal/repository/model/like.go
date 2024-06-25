package model

import (
	"myapp/internal/entity"

	"gorm.io/gorm"
)

type Like struct {
	gorm.Model
	UserID uint
	User   User
	PostID uint
	Post   Post
}

func ConvertLikeModelToEntity(l *Like) *entity.Like {
	return &entity.Like{
		ID:     l.ID,
		UserID: l.UserID,
		PostID: l.PostID,
	}
}

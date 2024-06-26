package model

import (
	"myapp/internal/entity"
	"time"
)

type Like struct {
	ID        uint `gorm:"primarykey"`
	CreatedAt time.Time
	UserID    uint
	User      User
	PostID    uint
	Post      Post
}

func ConvertLikeModelToEntity(l *Like) *entity.Like {
	return &entity.Like{
		ID:     l.ID,
		UserID: l.UserID,
		PostID: l.PostID,
	}
}

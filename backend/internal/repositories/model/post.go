package model

import (
	"time"

	"gorm.io/gorm"
)

type Post struct {
	gorm.Model
	Id        int
	Title     string
	Body      string
	UserId    int
	User      User
	CreatedAt time.Time
	UpdatedAt time.Time
}

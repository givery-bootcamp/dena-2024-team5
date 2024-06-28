package entity

import "time"

type Comment struct {
	ID        uint      `json:"id"`
	Body      string    `json:"body"`
	UserID    uint      `json:"user_id"`
	UserType  UserType  `json:"user_type"`
	PostID    uint      `json:"post_id"`
	CreatedAt time.Time `json:"created_at" format:"date-time"`
	UpdatedAt time.Time `json:"updated_at" format:"date-time"`
}

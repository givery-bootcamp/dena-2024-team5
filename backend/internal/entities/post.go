package entities

import "time"

type Post struct {
	Id        uint      `json:"id"`
	Title     string    `json:"title"`
	Body      string    `json:"body"`
	UserID    uint      `json:"user_id"`
	Username  string    `json:"username"`
	CreatedAt time.Time `json:"created_at" format:"date-time"`
	UpdatedAt time.Time `json:"updated_at" format:"date-time"`
}

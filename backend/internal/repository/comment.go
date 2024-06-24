package repository

import (
	"myapp/internal/repository/model"

	"gorm.io/gorm"
)

type CommentRepository struct {
	Conn *gorm.DB
}

func NewCommentRepository(conn *gorm.DB) *CommentRepository {
	return &CommentRepository{
		Conn: conn,
	}
}

func (c *CommentRepository) CommentNew(userID, postID uint, body string) error {
	comment := model.Comment{
		Body:   body,
		UserID: userID,
		PostID: postID,
	}
	result := c.Conn.Create(&comment)
	return result.Error
}

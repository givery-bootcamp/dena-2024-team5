package repository

import (
	"errors"
	"myapp/internal/entity"
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

// idに該当するcommentがないとき、返り値は (nil, nil) になる。
// errorはこれ以外の内部エラーが起きたときだけ入る。
func (r *CommentRepository) GetDetail(commentID uint) (*entity.Comment, error) {
	var obj model.Comment
	result := r.Conn.Preload("User").Preload("Post").Where("id = ?", commentID).First(&obj)
	if result.Error != nil {
		if errors.Is(result.Error, gorm.ErrRecordNotFound) {
			return nil, nil
		}
		return nil, result.Error
	}
	return model.ConvertCommentModelToEntity(&obj), nil
}

func (r *CommentRepository) CommentNew(userID, postID uint, body string) error {
	comment := model.Comment{
		Body:   body,
		UserID: userID,
		PostID: postID,
	}
	result := r.Conn.Create(&comment)
	return result.Error
}

func (r *CommentRepository) CommentUpdate(commentID uint, body string) error {
	comment := model.Comment{}
	comment.ID = commentID
	comment.Body = body
	result := r.Conn.Updates(&comment)
	return result.Error
}

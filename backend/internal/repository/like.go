package repository

import (
	"errors"
	"myapp/internal/entity"
	"myapp/internal/repository/model"

	"gorm.io/gorm"
)

type LikeRepository struct {
	Conn *gorm.DB
}

func NewLikeRepository(conn *gorm.DB) *LikeRepository {
	return &LikeRepository{
		Conn: conn,
	}
}

func (r *LikeRepository) AddLike(userID, postID uint) (*entity.Like, error) {
	like := model.Like{
		UserID: userID,
		PostID: postID,
	}
	err := r.Conn.Create(&like).Error
	if err != nil {
		if errors.Is(err, gorm.ErrDuplicatedKey) {
			return nil, nil
		}
		return nil, err
	}
	return model.ConvertLikeModelToEntity(&like), nil
}

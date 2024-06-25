package repository

import (
	"myapp/internal/entity"
	"myapp/internal/repository/model"

	"github.com/go-sql-driver/mysql"
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
		// MySQL code for duplicate entry
		if mysqlErr, ok := err.(*mysql.MySQLError); ok && mysqlErr.Number == 1062 {
			return nil, nil
		}
		return nil, err
	}
	return model.ConvertLikeModelToEntity(&like), nil
}

package repositories

import (
	"myapp/internal/entities"
	"myapp/internal/repositories/model"

	"gorm.io/gorm"
)

type UserRepository struct {
	Conn *gorm.DB
}

func NewUserRepository(conn *gorm.DB) *UserRepository {
	return &UserRepository{
		Conn: conn,
	}
}

func (p *UserRepository) GetByUsernameAndPassword(username, password string) (*entities.User, error) {
	var obj model.User
	result := p.Conn.Where("name = ? and password = ?", username, password).First(&obj)
	if result.Error != nil {
		return nil, result.Error
	}

	return model.ConvertUserModelToEntity(&obj), nil
}

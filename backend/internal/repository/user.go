package repository

import (
	"errors"
	"myapp/internal/entity"
	"myapp/internal/repository/model"

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

func (p *UserRepository) GetByUsernameAndPassword(username, password string) (*entity.User, error) {
	var obj model.User
	result := p.Conn.Where("name = ? and password = ?", username, password).First(&obj)
	if result.Error != nil {
		return nil, result.Error
	}

	return model.ConvertUserModelToEntity(&obj), nil
}

func (p *UserRepository) GetDetail(id uint) (*entity.User, error) {
	var user model.User
	result := p.Conn.First(&user, id)
	if result.Error != nil {
		return nil, result.Error
	}
	return model.ConvertUserModelToEntity(&user), nil
}

func (p *UserRepository) Create(username, password string) (*entity.User, error) {
	// 重複存在チェック
	var existingUser model.User
	result := p.Conn.Where("name = ?", username).First(&existingUser)
	if result.RowsAffected > 0 {
		return nil, errors.New("user with the same name already exists")
	}

	newUser := model.User{Name: username, Password: password}
	if err := p.Conn.Create(&newUser).Error; err != nil {
		return nil, err
	}
	return model.ConvertUserModelToEntity(&newUser), nil
}

func (p *UserRepository) GetByName(name string) (*entity.User, error) {
	var user model.User
	// nameにzombieを含むユーザーをランダムに取得
	err := p.Conn.Where("name = ?", name).First(&user).Error
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, nil
		}
		return nil, err
	}
	return model.ConvertUserModelToEntity(&user), nil
}

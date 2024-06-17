package repositories

import (
	"myapp/internal/entities"
	"myapp/internal/repositories/model"

	"gorm.io/gorm"
)

type PostRepository struct {
	Conn *gorm.DB
}

func NewPostRepository(conn *gorm.DB) *PostRepository {
	return &PostRepository{
		Conn: conn,
	}
}

func (p *PostRepository) GetList() ([]entities.Post, error) {
	var obj []model.Post
	result := p.Conn.Order("id desc").Preload("User").Find(&obj)
	if result.Error != nil {
		return nil, result.Error
	}

	posts := make([]entities.Post, len(obj))
	for i, model := range obj {
		posts[i] = *convertPostModelToEntity(&model)
	}
	return posts, nil
}

func (p *PostRepository) GetDetail(id uint) (*entities.Post, error) {
	var obj model.Post
	result := p.Conn.Preload("User").Where("id = ?", id).First(&obj)
	if result.Error != nil {
		return nil, result.Error
	}
	return convertPostModelToEntity(&obj), nil
}

func convertPostModelToEntity(p *model.Post) *entities.Post {
	return &entities.Post{
		Id:        p.ID,
		Title:     p.Title,
		Body:      p.Body,
		UserID:    p.UserID,
		Username:  p.User.Name,
		CreatedAt: p.CreatedAt,
		UpdatedAt: p.UpdatedAt,
	}
}

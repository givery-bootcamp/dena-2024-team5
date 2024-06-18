package repositories

import (
	"myapp/internal/entities"
	"myapp/internal/repositories/model"
	"time"

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
	for i, o := range obj {
		posts[i] = *model.ConvertPostModelToEntity(&o)
	}
	return posts, nil
}

func (p *PostRepository) GetDetail(id uint) (*entities.Post, error) {
	var obj model.Post
	result := p.Conn.Preload("User").Where("id = ?", id).First(&obj)
	if result.Error != nil {
		return nil, result.Error
	}
	return model.ConvertPostModelToEntity(&obj), nil
}

func (p *PostRepository) PostNew(userID uint, title, body string) error {
	post := &model.Post{
		Title:  title,
		Body:   body,
		UserID: userID,
	}
	result := p.Conn.Create(&post)
	return result.Error
}

func (p *PostRepository) Update(id uint, title, body string) error {
	m := model.Post{}
	if err := p.Conn.First(&m, id).Error; err != nil {
		return err
	}

	m.Title = title
	m.Body = body
	m.UpdatedAt = time.Now()
	if err := p.Conn.Save(&m).Error; err != nil {
		return err
	}

	return nil
}

func convertPostModelToEntity(p *model.Post) *entities.Post {
	return &entities.Post{
		ID:        p.ID,
		Title:     p.Title,
		Body:      p.Body,
		UserID:    p.UserID,
		Username:  p.User.Name,
		CreatedAt: p.CreatedAt,
		UpdatedAt: p.UpdatedAt,
	}
}

func (p *PostRepository) PostDelete(postID uint) error {
	result := p.Conn.Delete(&model.Post{}, "id = ?", postID)
	return result.Error
}

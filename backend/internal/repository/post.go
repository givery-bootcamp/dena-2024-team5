package repository

import (
	"myapp/internal/entity"
	"myapp/internal/repository/model"

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

func (p *PostRepository) GetList() ([]entity.Post, error) {
	var obj []model.Post
	result := p.Conn.Order("id desc").Preload("User").Find(&obj)
	if result.Error != nil {
		return nil, result.Error
	}

	posts := make([]entity.Post, len(obj))
	for i, o := range obj {
		posts[i] = *model.ConvertPostModelToEntity(&o)
	}
	return posts, nil
}

func (p *PostRepository) GetDetail(id uint) (*entity.Post, error) {
	var obj model.Post
	result := p.Conn.Preload("User").Where("id = ?", id).First(&obj)
	if result.Error != nil {
		return nil, result.Error
	}
	return model.ConvertPostModelToEntity(&obj), nil
}

func (p *PostRepository) PostNew(userID uint, title, body string) error {
	post := model.Post{
		Title:  title,
		Body:   body,
		UserID: userID,
	}
	result := p.Conn.Create(&post)
	return result.Error
}

func (p *PostRepository) Update(id uint, title, body string) error {
	m := model.Post{}
	m.ID = id
	m.Title = title
	m.Body = body
	result := p.Conn.Updates(&m)

	return result.Error
}

func (p *PostRepository) PostDelete(postID uint) error {
	result := p.Conn.Delete(&model.Post{}, "id = ?", postID)
	return result.Error
}

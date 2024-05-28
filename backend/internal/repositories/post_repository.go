package repositories

import (
	"gorm.io/gorm"
	"myapp/internal/entities"
	"time"
)

type User struct {
	gorm.Model
	Id   int
	Name string
	// 今後必要かも
	// Password  string
	// CreatedAt time.Time
	// UpdatedAt time.Time
}

type Post struct {
	gorm.Model
	Id        int
	Title     string
	Body      string
	UserId    int
	User      User
	CreatedAt time.Time
	UpdatedAt time.Time
}

type PostRepository struct {
	Conn *gorm.DB
}

func NewPostRepository(conn *gorm.DB) *PostRepository {
	return &PostRepository{
		Conn: conn,
	}
}

func (p *PostRepository) GetList() (*[]entities.Post, error) {
	var obj []Post
	result := p.Conn.Order("id desc").Preload("User").Find(&obj)
	if result.Error != nil {
		return nil, result.Error
	}

	posts := make([]entities.Post, len(obj))
	for i, model := range obj {
		posts[i] = *convertPostModelToEntity(&model)
	}
	return &posts, nil
}

func (p *PostRepository) GetDetail(id int) (*entities.Post, error) {
	var obj Post
	result := p.Conn.Preload("User").Where("id = ?", id).First(&obj)
	if result.Error != nil {
		return nil, result.Error
	}
	return convertPostModelToEntity(&obj), nil
}

func convertPostModelToEntity(p *Post) *entities.Post {
	return &entities.Post{
		Id:        p.Id,
		Title:     p.Title,
		Body:      p.Body,
		UserId:    p.UserId,
		Username:  p.User.Name,
		CreatedAt: p.CreatedAt,
		UpdatedAt: p.UpdatedAt,
	}
}

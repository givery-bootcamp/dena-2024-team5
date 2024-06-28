package repository

import (
	"errors"
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

// いいね数は含むが、コメントは空で返す
func (p *PostRepository) GetList() ([]entity.Post, error) {
	var obj []model.PostWith
	result := p.Conn.
		Model(&model.Post{}).
		Preload("User").
		Select("posts.*, COUNT(likes.id) AS like_count").
		Joins("LEFT JOIN likes ON posts.id = likes.post_id").
		Group("posts.id").
		Order("posts.id DESC").
		Find(&obj)
	if result.Error != nil {
		return nil, result.Error
	}

	posts := make([]entity.Post, len(obj))
	for i, o := range obj {
		posts[i] = *model.ConvertPostWithModelToEntity(&o)
	}
	return posts, nil
}

func (p *PostRepository) GetDetail(postID uint, includeCommentsAndLikeCount bool) (*entity.Post, error) {
	if includeCommentsAndLikeCount {
		var post model.PostWith
		err := p.Conn.
			Model(&model.Post{}).
			Preload("User").
			Select("posts.*, COUNT(likes.id) AS like_count").
			Joins("LEFT JOIN likes ON posts.id = likes.post_id").
			Where("posts.id = ?", postID).
			Group("posts.id").
			Preload("Comments.User").
			Find(&post).Error
		if err != nil {
			if errors.Is(err, gorm.ErrRecordNotFound) {
				return nil, nil
			}
			return nil, err
		}
		return model.ConvertPostWithModelToEntity(&post), nil
	} else {
		var post model.Post
		err := p.Conn.
			Model(&model.Post{}).
			Preload("User").
			Where("posts.id = ?", postID).
			Find(&post).Error
		if err != nil {
			if errors.Is(err, gorm.ErrRecordNotFound) {
				return nil, nil
			}
			return nil, err
		}
		return model.ConvertPostModelToEntity(&post), nil
	}
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

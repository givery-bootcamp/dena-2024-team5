package controllers_test

import (
	"encoding/json"
	"errors"
	"myapp/internal/controllers"
	"myapp/internal/entities"
	"myapp/internal/usecases"
	"testing"
	"time"

	"github.com/gin-gonic/gin"
)

type DummyPostRepository struct {
	Posts *[]entities.Post
}

func NewDummyPostRepository() *DummyPostRepository {
	return &DummyPostRepository{
		Posts: &[]entities.Post{},
	}
}

func (p *DummyPostRepository) SetPosts(posts *[]entities.Post) {
	p.Posts = posts
}

func (p *DummyPostRepository) GetList() (*[]entities.Post, error) {
	if p.Posts != nil {
		return p.Posts, nil
	} else {
		return nil, errors.New("No data")
	}
}

func TestPostGetList(t *testing.T) {
	repository := NewDummyPostRepository()
	usecase := usecases.NewPostGetListUsecase(repository)

	app := gin.Default()
	app.GET("/posts", func(ctx *gin.Context) {
		controllers.GetListInternal(ctx, usecase)
	})

	// 正常系
	DummyPosts := &[]entities.Post{
		{
			Id:        2,
			Title:     "test2",
			Body:      "This is test2",
			UserId:    1,
			Username:  "uga-rosa",
			CreatedAt: time.Now(),
			UpdatedAt: time.Now(),
		},
		{
			Id:        1,
			Title:     "test1",
			Body:      "This is test1",
			UserId:    1,
			Username:  "uga-rosa",
			CreatedAt: time.Now(),
			UpdatedAt: time.Now(),
		},
	}
	repository.SetPosts(DummyPosts)
	b, _ := json.Marshal(DummyPosts)
	controllers.TestRequest(t, app, "GET", "/posts", nil, 200, string(b))

	// DB落ちてる
	repository.SetPosts(nil)
	controllers.TestRequest(t, app, "GET", "/posts", nil, 500, `{"message":"No data"}`)
}

package controller_test

import (
	"encoding/json"
	"errors"
	"myapp/internal/controller"
	"myapp/internal/entity"
	"myapp/internal/usecase"
	"testing"
	"time"

	"github.com/gin-gonic/gin"
)

type DummyPostGetListRepository struct {
	Posts []entity.Post
}

func NewDummyPostGetListRepository() *DummyPostGetListRepository {
	return &DummyPostGetListRepository{
		Posts: []entity.Post{},
	}
}

func (p *DummyPostGetListRepository) SetPosts(posts []entity.Post) {
	p.Posts = posts
}

func (p *DummyPostGetListRepository) GetList() ([]entity.Post, error) {
	if p.Posts != nil {
		return p.Posts, nil
	} else {
		return nil, errors.New("database broken")
	}
}

func TestPostGetList(t *testing.T) {
	repository := NewDummyPostGetListRepository()
	usecase := usecase.NewPostGetListUsecase(repository)

	app := gin.Default()
	app.GET("/posts", func(ctx *gin.Context) {
		controller.PostGetList(ctx, usecase)
	})

	// 正常系
	DummyPostGetLists := []entity.Post{
		{
			ID:        2,
			Title:     "test2",
			Body:      "This is test2",
			UserID:    1,
			Username:  "uga-rosa",
			CreatedAt: time.Now(),
			UpdatedAt: time.Now(),
		},
		{
			ID:        1,
			Title:     "test1",
			Body:      "This is test1",
			UserID:    1,
			Username:  "uga-rosa",
			CreatedAt: time.Now(),
			UpdatedAt: time.Now(),
		},
	}
	repository.SetPosts(DummyPostGetLists)
	b, _ := json.Marshal(DummyPostGetLists)
	controller.TestRequest(t, app, "GET", "/posts", nil, 200, string(b))

	// DB落ちてる
	repository.SetPosts(nil)
	controller.TestRequest(t, app, "GET", "/posts", nil, 500, controller.NewErrResponse("database broken"))
}

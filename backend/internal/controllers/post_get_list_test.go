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

type DummyPostGetListRepository struct {
	Posts []entities.Post
}

func NewDummyPostGetListRepository() *DummyPostGetListRepository {
	return &DummyPostGetListRepository{
		Posts: []entities.Post{},
	}
}

func (p *DummyPostGetListRepository) SetPosts(posts []entities.Post) {
	p.Posts = posts
}

func (p *DummyPostGetListRepository) GetList() ([]entities.Post, error) {
	if p.Posts != nil {
		return p.Posts, nil
	} else {
		return nil, errors.New("database broken")
	}
}

func TestPostGetList(t *testing.T) {
	repository := NewDummyPostGetListRepository()
	usecase := usecases.NewPostGetListUsecase(repository)

	app := gin.Default()
	app.GET("/posts", func(ctx *gin.Context) {
		controllers.PostGetList(ctx, usecase)
	})

	// 正常系
	DummyPostGetLists := []entities.Post{
		{
			Id:        2,
			Title:     "test2",
			Body:      "This is test2",
			UserID:    1,
			Username:  "uga-rosa",
			CreatedAt: time.Now(),
			UpdatedAt: time.Now(),
		},
		{
			Id:        1,
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
	controllers.TestRequest(t, app, "GET", "/posts", nil, 200, string(b))

	// DB落ちてる
	repository.SetPosts(nil)
	controllers.TestRequest(t, app, "GET", "/posts", nil, 500, controllers.NewErrResponse("database broken"))
}

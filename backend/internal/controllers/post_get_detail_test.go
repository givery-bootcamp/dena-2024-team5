package controllers_test

import (
	"encoding/json"
	"errors"
	"myapp/internal/controllers"
	"myapp/internal/entities"
	"myapp/internal/usecases"
	"net/http"
	"strconv"
	"testing"
	"time"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type DummyPostGetDetailRepository struct {
	Posts []entities.Post
}

func NewDummyPostGetDetailRepository() *DummyPostGetDetailRepository {
	return &DummyPostGetDetailRepository{
		Posts: []entities.Post{},
	}
}

func (p *DummyPostGetDetailRepository) SetPosts(posts []entities.Post) {
	p.Posts = posts
}

func (p *DummyPostGetDetailRepository) GetDetail(id int) (*entities.Post, error) {
	if p.Posts == nil {
		return nil, errors.New("database broken")
	} else {
		for _, post := range p.Posts {
			if post.Id == id {
				return &post, nil
			}
		}
		return nil, gorm.ErrRecordNotFound
	}
}

func TestPostGetDetail(t *testing.T) {
	repository := NewDummyPostGetDetailRepository()
	DummyPostGetDetails := []entities.Post{
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
	repository.SetPosts(DummyPostGetDetails)
	usecase := usecases.NewPostGetDetailUsecase(repository)

	app := gin.Default()
	app.GET("/posts/:postId", func(ctx *gin.Context) {
		controllers.PostGetDetail(ctx, usecase)
	})

	// 正常系
	b, _ := json.Marshal((DummyPostGetDetails)[0])
	controllers.TestRequest(t, app, "GET", "/posts/2", nil, http.StatusOK, string(b))
	// 不正なIDを指定 (数値でない)
	_, err := strconv.Atoi("foo")
	expectedResponse := controllers.NewErrResponse(err.Error())
	controllers.TestRequest(t, app, "GET", "/posts/foo", nil, http.StatusBadRequest, expectedResponse)
	// 不正なIDを指定 (数値だけど対応するPostがない)
	expectedResponse = controllers.NewErrResponse(gorm.ErrRecordNotFound.Error())
	controllers.TestRequest(t, app, "GET", "/posts/3", nil, http.StatusNotFound, expectedResponse)

	// DB落ちてる
	repository.SetPosts(nil)
	expectedResponse = controllers.NewErrResponse("database broken")
	controllers.TestRequest(t, app, "GET", "/posts/1", nil, http.StatusInternalServerError, expectedResponse)
}

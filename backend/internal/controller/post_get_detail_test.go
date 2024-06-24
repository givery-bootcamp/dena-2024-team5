package controller_test

import (
	"encoding/json"
	"errors"
	"myapp/internal/controller"
	"myapp/internal/entity"
	"myapp/internal/usecase"
	"net/http"
	"strconv"
	"testing"
	"time"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type DummyPostGetDetailRepository struct {
	Posts []entity.Post
}

func NewDummyPostGetDetailRepository() *DummyPostGetDetailRepository {
	return &DummyPostGetDetailRepository{
		Posts: []entity.Post{},
	}
}

func (p *DummyPostGetDetailRepository) SetPosts(posts []entity.Post) {
	p.Posts = posts
}

func (p *DummyPostGetDetailRepository) GetDetail(id uint) (*entity.Post, error) {
	if p.Posts == nil {
		return nil, errors.New("database broken")
	} else {
		for _, post := range p.Posts {
			if post.ID == id {
				return &post, nil
			}
		}
		return nil, gorm.ErrRecordNotFound
	}
}

func TestPostGetDetail(t *testing.T) {
	repository := NewDummyPostGetDetailRepository()
	DummyPostGetDetails := []entity.Post{
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
	repository.SetPosts(DummyPostGetDetails)
	usecase := usecase.NewPostGetDetailUsecase(repository)

	app := gin.Default()
	app.GET("/posts/:postID", func(ctx *gin.Context) {
		controller.PostGetDetail(ctx, usecase)
	})

	// 正常系
	b, _ := json.Marshal((DummyPostGetDetails)[0])
	controller.TestRequest(t, app, "GET", "/posts/2", nil, http.StatusOK, string(b))
	// 不正なIDを指定 (数値でない)
	_, err := strconv.ParseUint("foo", 10, 64)
	expectedResponse := controller.NewErrResponse(err.Error())
	controller.TestRequest(t, app, "GET", "/posts/foo", nil, http.StatusBadRequest, expectedResponse)
	// 不正なIDを指定 (数値だけど対応するPostがない)
	expectedResponse = controller.NewErrResponse(gorm.ErrRecordNotFound.Error())
	controller.TestRequest(t, app, "GET", "/posts/3", nil, http.StatusNotFound, expectedResponse)

	// DB落ちてる
	repository.SetPosts(nil)
	expectedResponse = controller.NewErrResponse("database broken")
	controller.TestRequest(t, app, "GET", "/posts/1", nil, http.StatusInternalServerError, expectedResponse)
}

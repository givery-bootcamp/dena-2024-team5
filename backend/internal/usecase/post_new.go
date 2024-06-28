package usecase

import (
	"io"
	"myapp/internal/interfaces"

	"github.com/google/uuid"
)

type PostNewUsecase struct {
	postRepository  interfaces.PostNewRepository
	imageRepository interfaces.ImageUploadRepository
}

func NewPostNewUsecase(
	postRepository interfaces.PostNewRepository,
	imageRepository interfaces.ImageUploadRepository,
) *PostNewUsecase {
	return &PostNewUsecase{
		postRepository:  postRepository,
		imageRepository: imageRepository,
	}
}

func (p *PostNewUsecase) Execute(userID uint, title, body string, reader io.Reader) error {
	if reader == nil {
		return p.postRepository.PostNew(userID, title, body, "")
	}

	key := uuid.New().String() + ".jpg"
	url, err := p.imageRepository.Upload(key, reader)
	if err != nil {
		return err
	}

	return p.postRepository.PostNew(userID, title, body, url)
}

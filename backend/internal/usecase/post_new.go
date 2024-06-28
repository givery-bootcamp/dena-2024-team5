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

func (p *PostNewUsecase) Execute(
	userID uint,
	title string,
	body string,
	reader io.Reader,
	fileName string,
	contentType string,
) error {
	if reader == nil {
		return p.postRepository.PostNew(userID, title, body, "")
	}

	key := uuid.New().String() + "-" + fileName
	url, err := p.imageRepository.Upload(key, reader, contentType)
	if err != nil {
		return err
	}

	return p.postRepository.PostNew(userID, title, body, url)
}

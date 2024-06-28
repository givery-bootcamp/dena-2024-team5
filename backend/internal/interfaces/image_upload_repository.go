package interfaces

import (
	"io"
)

type ImageUploadRepository interface {
	Upload(key string, image io.Reader, contentType string) (url string, err error)
}

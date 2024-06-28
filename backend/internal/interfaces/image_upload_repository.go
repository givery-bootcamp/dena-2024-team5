package interfaces

import (
	"io"
)

type ImageUploadRepository interface {
	Upload(key string, image io.Reader) (url string, err error)
}

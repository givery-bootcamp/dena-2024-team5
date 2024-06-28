package repository

import (
	"context"
	"fmt"
	"io"
	"log"
	"myapp/internal/constant"
	"net/http"

	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/service/s3"
)

type ImageRepository struct {
	Conn *s3.Client
}

func NewImageRepository(conn *s3.Client) *ImageRepository {
	return &ImageRepository{
		Conn: conn,
	}
}

func (r *ImageRepository) Upload(
	key string,
	image io.Reader,
) (url string, err error) {
	bucketName := constant.AWS_S3_BUCKET_NAME
	_, err = r.Conn.PutObject(context.Background(), &s3.PutObjectInput{
		Bucket:      aws.String(bucketName),
		Key:         aws.String(key),
		Body:        image,
		ContentType: aws.String("image/jpeg"),
	})
	// io.Reader to []byte
	log.Println(http.DetectContentType(image))
	if err != nil {
		return "", err
	}

	url = fmt.Sprintf("https://%s.s3.%s.amazonaws.com/%s", bucketName, constant.AWS_S3_REGION, key)

	return url, err
}

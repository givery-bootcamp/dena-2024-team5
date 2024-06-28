package external

import (
	"context"
	"log"
	"myapp/internal/constant"

	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/config"
	"github.com/aws/aws-sdk-go-v2/service/s3"
)

var S3Client *s3.Client

func SetupS3Client() {
	sdkConfig, err := config.LoadDefaultConfig(context.Background())
	if err != nil {
		log.Fatalf("failed to initialize s3 client %v", err)
		return
	}
	sdkConfig.BaseEndpoint = aws.String(constant.AWS_S3_ENDPOINT)
	cli := s3.NewFromConfig(sdkConfig)
	S3Client = cli
}

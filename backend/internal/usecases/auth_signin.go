package usecases

import (
	"fmt"
	"myapp/internal/entities"
	"myapp/internal/interfaces"
	"os"
	"time"

	"github.com/golang-jwt/jwt"
	"github.com/joho/godotenv"
)

type AuthSigninUsecase struct {
	repository interfaces.UserRepository
}

func NewAuthSigninUsecase(r interfaces.UserRepository) *AuthSigninUsecase {
	return &AuthSigninUsecase{
		repository: r,
	}
}

func (a *AuthSigninUsecase) Execute(username, password string) (*entities.User, string, error) {
	user, err := a.repository.GetByUsernameAndPassword(username, password)
	if err != nil {
		return nil, "", err
	}

	// Claimsオブジェクトの作成
	claims := jwt.MapClaims{
		"user_id": 12345678,
		"exp":     time.Now().Add(time.Hour * 24).Unix(),
	}
	// ヘッダーとペイロードの生成
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	err = godotenv.Load()
	if err != nil {
		return nil, "", err
	}

	secretKey := os.Getenv("SECRET_KEY")
	fmt.Println(secretKey)

	// ファイル名を指定できる

	// トークンに署名を付与
	tokenString, _ := token.SignedString([]byte(secretKey))
	fmt.Println(tokenString)

	return user, tokenString, nil
}

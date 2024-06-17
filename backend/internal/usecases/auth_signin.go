package usecases

import (
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
	jwtToken, err := GetJwtToken(user.Id)
	if err != nil {
		return nil, "", err
	}

	return user, jwtToken, nil
}

func GetJwtToken(userId int) (string, error) {
	err := godotenv.Load()
	if err != nil {
		return "", err
	}
	secretKey := os.Getenv("SECRET_KEY")

	// ヘッダーとペイロードの生成
	// Claimsオブジェクトの作成
	claims := jwt.MapClaims{
		"user_id": userId,
		"exp":     time.Now().Add(time.Hour * 24).Unix(),
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	// トークンに署名を付与
	tokenString, _ := token.SignedString([]byte(secretKey))
	return tokenString, nil
}

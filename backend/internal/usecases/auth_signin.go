package usecases

import (
	"myapp/internal/entities"
	"myapp/internal/interfaces"
	"os"
	"time"

	"github.com/golang-jwt/jwt"
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
	jwtToken, err := GetJwtToken(user.ID)
	if err != nil {
		return nil, "", err
	}

	return user, jwtToken, nil
}

func GetJwtToken(userID uint) (string, error) {
	// ヘッダーとペイロードの生成
	// Claimsオブジェクトの作成
	claims := jwt.MapClaims{
		"user_id": userID,
		"exp":     time.Now().Add(time.Hour * 24).Unix(),
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	// トークンに署名を付与
	secretKey := os.Getenv("SECRET_KEY")
	tokenString, _ := token.SignedString([]byte(secretKey))
	return tokenString, nil
}

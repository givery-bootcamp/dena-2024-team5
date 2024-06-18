package middleware

import (
	"errors"
	"myapp/internal/constants"
	"myapp/internal/controllers"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt"
)

type JwtClaims struct {
	jwt.StandardClaims
	UserID uint `json:"user_id,omitempty"`
}

func JwtAuthorizeMiddleware() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		tokenString, err := ctx.Cookie("jwt")
		if err != nil {
			controllers.HandleErrorAbort(ctx, http.StatusBadRequest, err)
			return
		}

		token, err := jwt.ParseWithClaims(tokenString, &JwtClaims{}, func(token *jwt.Token) (interface{}, error) {
			signingMethod := token.Method.Alg()
			if signingMethod != "HS256" {
				return nil, errors.New("invalid signing method")
			}
			secretKey := os.Getenv("SECRET_KEY")
			return []byte(secretKey), nil
		})

		if err != nil {
			controllers.HandleErrorAbort(ctx, http.StatusInternalServerError, errors.New("invalid token"))
			return
		}

		claims, ok := token.Claims.(*JwtClaims)
		if (!ok) || !token.Valid {
			controllers.HandleErrorAbort(ctx, http.StatusInternalServerError, errors.New("invalid token"))
			return
		}

		ctx.Set(constants.GIN_CONTEXT_USERID, claims.UserID)
		ctx.Next()
	}
}

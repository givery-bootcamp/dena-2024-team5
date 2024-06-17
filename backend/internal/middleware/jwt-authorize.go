package middleware

import (
	"errors"
	"myapp/internal/constants"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt"
)

type JwtClaims struct {
	jwt.StandardClaims
	UserID int `json:"user_id,omitempty"`
}

func JwtAuthorizeMiddleware() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		tokenString, err := ctx.Cookie("jwt")
		if err != nil {
			ctx.AbortWithStatusJSON(http.StatusBadRequest, gin.H{
				"error": "login required",
			})
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
			ctx.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{
				"error": "invalid token",
			})
			return
		}

		claims, ok := token.Claims.(*JwtClaims)
		if (!ok) || !token.Valid {
			ctx.AbortWithStatusJSON(http.StatusInternalServerError, errors.New("invalid token"))
			return
		}

		ctx.Set(constants.GIN_CONTEXT_USERID, claims.UserID)
		ctx.Next()

	}
}

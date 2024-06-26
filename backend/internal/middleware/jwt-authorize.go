package middleware

import (
	"errors"
	"fmt"
	"myapp/internal/config"
	"myapp/internal/constant"
	"myapp/internal/controller"
	"net/http"

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
		fmt.Println("tokenString=", tokenString)
		if err != nil {
			controller.HandleErrorAbort(ctx, http.StatusBadRequest, err)
			return
		}

		token, err := jwt.ParseWithClaims(tokenString, &JwtClaims{}, func(token *jwt.Token) (interface{}, error) {
			signingMethod := token.Method.Alg()
			if signingMethod != "HS256" {
				return nil, errors.New("invalid signing method")
			}
			secretKey := config.AuthSecretKey
			return []byte(secretKey), nil
		})

		if err != nil {
			controller.HandleErrorAbort(ctx, http.StatusInternalServerError, errors.New("invalid token"))
			return
		}

		claims, ok := token.Claims.(*JwtClaims)
		if (!ok) || !token.Valid {
			controller.HandleErrorAbort(ctx, http.StatusInternalServerError, errors.New("invalid token"))
			return
		}

		ctx.Set(constant.GIN_CONTEXT_USERID, claims.UserID)
		ctx.Next()
	}
}

package controller

import (
	"errors"
	"fmt"
	"log"
	"myapp/internal/constant"
	u "myapp/internal/usecase"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

// Add like to a post
// @Summary get list posts
// @Description 投稿に対して、いいねを付与します。
// @Tags posts
// @Param	postID	path	int		true	"Post ID"
// @Produce json
// @Success 204
// @Failure 400 {object} controller.ErrorResponse
// @Failure 409 {object} controller.ErrorResponse その投稿に既にいいねしているとき
// @Failure 500 {object} controller.ErrorResponse
// @Router /posts/{postID}/like [post]
func PostLikeAdd(
	ctx *gin.Context,
	postLikeAddUsecase *u.PostLikeAddUsecase,
	commentZombieNewUsecase *u.CommentNewByZombieUsecase,
	notificationMessageUsecase *u.NotificationMessageUsecase,
	postGetDetailUsecase *u.PostGetDetailUsecase,
) {
	if postLikeAddUsecase == nil || commentZombieNewUsecase == nil {
		handleError(ctx, http.StatusInternalServerError, errors.New("ぬるぽ"))
		return
	}

	// jwtからuserIDを取る
	userID, ok := ctx.Value(constant.GIN_CONTEXT_USERID).(uint)
	if !ok {
		handleError(ctx, http.StatusBadRequest, errors.New("user id not found"))
		return
	}

	// pathからpostIDを取る
	postIDStr := ctx.Param("postID")
	postID64, err := strconv.ParseUint(postIDStr, 10, 64)
	if err != nil {
		handleError(ctx, http.StatusBadRequest, err)
		return
	}
	postID := uint(postID64)

	// postの存在確認
	post, err := postGetDetailUsecase.Execute(postID, false)
	if err != nil {
		handleError(ctx, http.StatusInternalServerError, err)
		return
	}
	if post == nil {
		handleError(ctx, http.StatusBadRequest, errors.New("invalid post ID"))
		return
	}

	err = postLikeAddUsecase.Execute(userID, postID)
	if err != nil {
		if errors.Is(err, u.RecordConflictError) {
			handleError(ctx, http.StatusConflict, err)
		} else {
			handleError(ctx, http.StatusInternalServerError, err)
		}
		return
	}

	ctx.Status(http.StatusNoContent)

	err = commentZombieNewUsecase.Execute(postID)
	// NOTE: インプレゾンビのコメントが成功したかどうかログで確認できるとデバッグ時に分かりやすいかなと思い、残しています。
	if err != nil {
		log.Printf("failed to comment zombie: %v", err)
		return
	}
	message := fmt.Sprintf("「%s」にコメントが追加されました。", post.Title)
	err = notificationMessageUsecase.Execute(post.UserID, message)
	if err != nil {
		// NOTE: メッセージの通知のエラーログ
		log.Printf("failed to notify message: %v", err)
		return
	}

	log.Println("commented zombie")
}

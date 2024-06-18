package controllers

import (
	"errors"
	"myapp/internal/constants"
	"myapp/internal/usecases"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type PostUpdateRequest struct {
	Title string `json:"title" binding:"required,max=100" maxLength:"100"`
	Body  string `json:"body" binding:"required"`
}

// @Summary update post
// @Description	投稿を更新します。
// @Tags	posts
// @Accept	json
// @Param postUpdate body controllers.PostUpdateRequest true "リクエストパラメータ"
// @Param	postID	path	int		true	"Post ID"
// @Success	204
// @Failure	403		{object}	controllers.ErrorResponse
// @Failure	500		{object}	controllers.ErrorResponse
// @Router	/posts/{postID}	[put]
func PostUpdate(
	ctx *gin.Context,
	postOwnerValidateUsecase *usecases.PostOwnerValidateUsecase,
	postUpdateUsecase *usecases.PostUpdateUsecase,
) {
	if postUpdateUsecase == nil || postOwnerValidateUsecase == nil {
		handleError(ctx, http.StatusInternalServerError, errors.New("ぬるぽ"))
		return
	}
	postIDStr := ctx.Param("postID")
	postID, err := strconv.ParseUint(postIDStr, 10, 64)
	if err != nil {
		handleError(ctx, http.StatusBadRequest, err)
		return
	}

	req := PostUpdateRequest{}
	err = ctx.ShouldBind(&req)
	if err != nil {
		handleError(ctx, http.StatusBadRequest, err)
		return
	}

	userID, ok := ctx.Value(constants.GIN_CONTEXT_USERID).(uint)
	if !ok {
		handleError(ctx, http.StatusBadRequest, errors.New("user id not found"))
		return
	}

	isMatched, err := postOwnerValidateUsecase.Execute(userID, uint(postID))
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			handleError(ctx, http.StatusNotFound, err)
		} else {
			handleError(ctx, http.StatusInternalServerError, err)
		}
		return
	}

	if !isMatched {
		handleError(ctx, http.StatusForbidden, errors.New("post owner mismatch"))
		return
	}

	err = postUpdateUsecase.Execute(uint(postID), req.Title, req.Body)
	if err != nil {
		handleError(ctx, http.StatusInternalServerError, err)
		return
	}
	ctx.Status(http.StatusNoContent)
}

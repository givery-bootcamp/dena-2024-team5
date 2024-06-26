package controller

import (
	"errors"
	"myapp/internal/constant"
	"myapp/internal/usecase"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

type PostUpdateRequest struct {
	Title string `json:"title" binding:"required,max=100" maxLength:"100"`
	Body  string `json:"body" binding:"required"`
}

// @Summary update post
// @Description	投稿を更新します。
// @Tags	posts
// @Accept	json
// @Param postUpdate body controller.PostUpdateRequest true "リクエストパラメータ"
// @Param	postID	path	int		true	"Post ID"
// @Success	204
// @Failure	400		{object}	controller.ErrorResponse
// @Failure	403		{object}	controller.ErrorResponse
// @Failure	404		{object}	controller.ErrorResponse
// @Failure	500		{object}	controller.ErrorResponse
// @Router	/posts/{postID}	[put]
func PostUpdate(
	ctx *gin.Context,
	postOwnerValidateUsecase *usecase.PostOwnerValidateUsecase,
	postUpdateUsecase *usecase.PostUpdateUsecase,
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
	err = ctx.ShouldBindJSON(&req)
	if err != nil {
		handleError(ctx, http.StatusBadRequest, err)
		return
	}

	userID, ok := ctx.Value(constant.GIN_CONTEXT_USERID).(uint)
	if !ok {
		handleError(ctx, http.StatusBadRequest, errors.New("user id not found"))
		return
	}

	isMatched, err := postOwnerValidateUsecase.Execute(userID, uint(postID))
	if err != nil {
		if errors.Is(err, usecase.RecordNotFoundError) {
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

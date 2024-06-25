package interfaces

import (
	"myapp/internal/entity"
)

type CommentGetRepository interface {
	// idに該当するcommentがないとき、返り値は (nil, nil) になる。
	// errorはこれ以外の内部エラーが起きたときだけ入る。
	GetDetail(commentID uint) (*entity.Comment, error)
}

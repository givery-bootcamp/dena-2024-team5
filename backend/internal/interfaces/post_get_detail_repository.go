package interfaces

import (
	"myapp/internal/entity"
)

type PostGetDetailRepository interface {
	// idに該当するpostがないとき、返り値は (nil, nil) になる。
	// errorはこれ以外の内部エラーが起きたときだけ入る。
	GetDetail(id uint, includeCommentsAndLikeCount bool) (*entity.Post, error)
}

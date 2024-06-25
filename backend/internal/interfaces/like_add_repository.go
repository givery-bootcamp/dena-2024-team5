package interfaces

import "myapp/internal/entity"

type LikeAddRepository interface {
	// userID/postIDが一致するいいねが既にあるときは (nil, nil) を返す。
	// それ以外の内部エラーが発生したときは error に値が入る。
	AddLike(userID, postID uint) (*entity.Like, error)
}

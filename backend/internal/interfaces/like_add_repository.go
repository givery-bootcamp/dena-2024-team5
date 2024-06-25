package interfaces

import "myapp/internal/entity"

type LikeAddRepository interface {
	AddLike(userID, postID uint) (*entity.Like, error)
}

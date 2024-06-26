/* eslint-disable */
export type Controller_AuthSigninReq = {
  password: string
  username: string
}

export type Controller_CommentNewReq = {
  body: string
  postId: number
}

export type Controller_CommentUpdateReq = {
  body: string
}

export type Controller_ErrorResponse = {
  message: string
}

export type Controller_PostNewReq = {
  body: string
  title: string
}

export type Controller_PostUpdateRequest = {
  body: string
  title: string
}

export type Controller_UserCreateReq = {
  password: string
  username: string
}

export type Entity_Comment = {
  body: string
  created_at: string
  id: number
  post_id: number
  updated_at: string
  user_id: number
}

export type Entity_Post = {
  body: string
  comments: Entity_Comment[]
  created_at: string
  id: number
  like_count: number
  title: string
  updated_at: string
  user_id: number
  username: string
}

export type Entity_User = {
  id: number
  username: string
}

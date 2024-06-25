/* eslint-disable */
export type Controller_AuthSigninReq = {
  password: string
  username: string
}

export type Controller_CommentNewReq = {
  body: string
  postId: number
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

export type Entity_Post = {
  body: string
  created_at: string
  id: number
  title: string
  updated_at: string
  user_id: number
  username: string
}

export type Entity_User = {
  id: number
  username: string
}

/* eslint-disable */
export type Controllers_AuthSigninReq = {
  password: string
  username: string
}

export type Controllers_ErrorResponse = {
  message: string
}

export type Entities_Post = {
  body: string
  created_at: string
  id: number
  title: string
  updated_at: string
  user_id: number
  username: string
}

export type Entities_User = {
  id: number
  username: string
}

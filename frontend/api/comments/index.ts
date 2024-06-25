/* eslint-disable */
import type * as Types from '../@types'

export type Methods = {
  /** サインインしているユーザーで、指定された投稿に、本文のコメントを作成する */
  post: {
    status: 204
    /** リクエストパラメータ */
    reqBody: Types.Controller_CommentNewReq
  }
}

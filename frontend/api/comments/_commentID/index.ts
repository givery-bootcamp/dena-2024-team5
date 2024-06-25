/* eslint-disable */
import type * as Types from '../../@types'

export type Methods = {
  /** サインインしているユーザーで、指定されたコメントを更新する */
  put: {
    status: 204
    /** リクエストパラメータ */
    reqBody: Types.Controller_CommentUpdateReq
  }

  /** サインインしているユーザーで、指定されたコメントを削除する */
  delete: {
    status: 204
  }
}

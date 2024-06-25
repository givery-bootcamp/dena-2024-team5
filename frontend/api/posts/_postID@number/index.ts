/* eslint-disable */
import type * as Types from '../../@types'

export type Methods = {
  /** 投稿の詳細を取得します */
  get: {
    status: 200
    /** OK */
    resBody: Types.Entity_Post
  }

  /** 投稿を更新します。 */
  put: {
    status: 204
    /** リクエストパラメータ */
    reqBody: Types.Controller_PostUpdateRequest
  }

  /** 投稿を削除する */
  delete: {
    status: 204
  }
}

/* eslint-disable */
import type * as Types from '../../@types'

export type Methods = {
  /** ログインしているユーザーの情報を取得します */
  get: {
    status: 200
    /** OK */
    resBody: Types.Entity_User
  }
}

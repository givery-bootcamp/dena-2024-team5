/* eslint-disable */
import type * as Types from '../@types'

export type Methods = {
  /** usernameとpasswordでuserを作成します。 */
  post: {
    status: 200
    /** OK */
    resBody: Types.Entity_User
    /** リクエストパラメータ */
    reqBody: Types.Controller_UserCreateReq
  }
}

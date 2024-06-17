/* eslint-disable */
import type * as Types from '../@types'

export type Methods = {
  /** usernameとpasswordでsigninします。 */
  post: {
    status: 200
    /** OK */
    resBody: Types.Entities_User
    /** リクエストパラメータ */
    reqBody: Types.Controllers_AuthSigninReq
  }
}

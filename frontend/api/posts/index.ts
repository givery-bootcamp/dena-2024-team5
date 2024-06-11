/* eslint-disable */
import type * as Types from '../@types'

export type Methods = {
  /** 投稿一覧を取得します */
  get: {
    status: 200
    /** OK */
    resBody: Types.Entities_Post[]
  }
}

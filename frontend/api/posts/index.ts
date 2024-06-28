/* eslint-disable */
import type { ReadStream } from 'fs'
import type * as Types from '../@types'

export type Methods = {
  /** 投稿一覧を取得します */
  get: {
    status: 200
    /** OK */
    resBody: Types.Entity_Post[]
  }

  /** サインインしているユーザーで、指定されたタイトル、本文の投稿を作成する */
  post: {
    status: 204
    reqFormat: FormData

    reqBody: {
      body: string
      title: string
      /** 画像ファイル */
      image?: (File | ReadStream) | undefined
    }
  }
}

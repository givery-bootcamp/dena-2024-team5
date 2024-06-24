import type { AspidaClient, BasicHeaders } from 'aspida';
import type { Methods as Methods_1kz9onh } from './posts';
import type { Methods as Methods_rslgc9 } from './posts/_postID@number';
import type { Methods as Methods_1oqkkb0 } from './signin';
import type { Methods as Methods_1xhiioa } from './users';
import type { Methods as Methods_jzr18p } from './users/me';

const api = <T>({ baseURL, fetch }: AspidaClient<T>) => {
  const prefix = (baseURL === undefined ? '//localhost:9000' : baseURL).replace(/\/$/, '');
  const PATH0 = '/posts';
  const PATH1 = '/signin';
  const PATH2 = '/users';
  const PATH3 = '/users/me';
  const GET = 'GET';
  const POST = 'POST';

  return {
    posts: {
      _postID: (val1: number) => {
        const prefix1 = `${PATH0}/${val1}`;

        return {
          /**
           * 投稿の詳細を取得します
           * @returns OK
           */
          get: (option?: { config?: T | undefined } | undefined) =>
            fetch<Methods_rslgc9['get']['resBody'], BasicHeaders, Methods_rslgc9['get']['status']>(prefix, prefix1, GET, option).json(),
          /**
           * 投稿の詳細を取得します
           * @returns OK
           */
          $get: (option?: { config?: T | undefined } | undefined) =>
            fetch<Methods_rslgc9['get']['resBody'], BasicHeaders, Methods_rslgc9['get']['status']>(prefix, prefix1, GET, option).json().then(r => r.body),
          $path: () => `${prefix}${prefix1}`,
        };
      },
      /**
       * 投稿一覧を取得します
       * @returns OK
       */
      get: (option?: { config?: T | undefined } | undefined) =>
        fetch<Methods_1kz9onh['get']['resBody'], BasicHeaders, Methods_1kz9onh['get']['status']>(prefix, PATH0, GET, option).json(),
      /**
       * 投稿一覧を取得します
       * @returns OK
       */
      $get: (option?: { config?: T | undefined } | undefined) =>
        fetch<Methods_1kz9onh['get']['resBody'], BasicHeaders, Methods_1kz9onh['get']['status']>(prefix, PATH0, GET, option).json().then(r => r.body),
      /**
       * サインインしているユーザーで、指定されたタイトル、本文の投稿を作成する
       * @param option.body - リクエストパラメータ
       */
      post: (option: { body: Methods_1kz9onh['post']['reqBody'], config?: T | undefined }) =>
        fetch<void, BasicHeaders, Methods_1kz9onh['post']['status']>(prefix, PATH0, POST, option).send(),
      /**
       * サインインしているユーザーで、指定されたタイトル、本文の投稿を作成する
       * @param option.body - リクエストパラメータ
       */
      $post: (option: { body: Methods_1kz9onh['post']['reqBody'], config?: T | undefined }) =>
        fetch<void, BasicHeaders, Methods_1kz9onh['post']['status']>(prefix, PATH0, POST, option).send().then(r => r.body),
      $path: () => `${prefix}${PATH0}`,
    },
    signin: {
      /**
       * usernameとpasswordでsigninします。
       * @param option.body - リクエストパラメータ
       * @returns OK
       */
      post: (option: { body: Methods_1oqkkb0['post']['reqBody'], config?: T | undefined }) =>
        fetch<Methods_1oqkkb0['post']['resBody'], BasicHeaders, Methods_1oqkkb0['post']['status']>(prefix, PATH1, POST, option).json(),
      /**
       * usernameとpasswordでsigninします。
       * @param option.body - リクエストパラメータ
       * @returns OK
       */
      $post: (option: { body: Methods_1oqkkb0['post']['reqBody'], config?: T | undefined }) =>
        fetch<Methods_1oqkkb0['post']['resBody'], BasicHeaders, Methods_1oqkkb0['post']['status']>(prefix, PATH1, POST, option).json().then(r => r.body),
      $path: () => `${prefix}${PATH1}`,
    },
    users: {
      me: {
        /**
         * ログインしているユーザーの情報を取得します
         * @returns OK
         */
        get: (option?: { config?: T | undefined } | undefined) =>
          fetch<Methods_jzr18p['get']['resBody'], BasicHeaders, Methods_jzr18p['get']['status']>(prefix, PATH3, GET, option).json(),
        /**
         * ログインしているユーザーの情報を取得します
         * @returns OK
         */
        $get: (option?: { config?: T | undefined } | undefined) =>
          fetch<Methods_jzr18p['get']['resBody'], BasicHeaders, Methods_jzr18p['get']['status']>(prefix, PATH3, GET, option).json().then(r => r.body),
        $path: () => `${prefix}${PATH3}`,
      },
      /**
       * usernameとpasswordでuserを作成します。
       * @param option.body - リクエストパラメータ
       * @returns OK
       */
      post: (option: { body: Methods_1xhiioa['post']['reqBody'], config?: T | undefined }) =>
        fetch<Methods_1xhiioa['post']['resBody'], BasicHeaders, Methods_1xhiioa['post']['status']>(prefix, PATH2, POST, option).json(),
      /**
       * usernameとpasswordでuserを作成します。
       * @param option.body - リクエストパラメータ
       * @returns OK
       */
      $post: (option: { body: Methods_1xhiioa['post']['reqBody'], config?: T | undefined }) =>
        fetch<Methods_1xhiioa['post']['resBody'], BasicHeaders, Methods_1xhiioa['post']['status']>(prefix, PATH2, POST, option).json().then(r => r.body),
      $path: () => `${prefix}${PATH2}`,
    },
  };
};

export type ApiInstance = ReturnType<typeof api>;
export default api;

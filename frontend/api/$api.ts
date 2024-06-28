import type { AspidaClient, BasicHeaders } from 'aspida';
import type { Methods as Methods_vbicos } from './comments';
import type { Methods as Methods_1mt0zrm } from './comments/_commentID';
import type { Methods as Methods_1kz9onh } from './posts';
import type { Methods as Methods_rslgc9 } from './posts/_postID@number';
import type { Methods as Methods_1oua0ix } from './posts/_postID@number/like';
import type { Methods as Methods_1oqkkb0 } from './signin';
import type { Methods as Methods_1xhiioa } from './users';
import type { Methods as Methods_jzr18p } from './users/me';

const api = <T>({ baseURL, fetch }: AspidaClient<T>) => {
  const prefix = (baseURL === undefined ? '/' : baseURL).replace(/\/$/, '');
  const PATH0 = '/comments';
  const PATH1 = '/posts';
  const PATH2 = '/like';
  const PATH3 = '/signin';
  const PATH4 = '/users';
  const PATH5 = '/users/me';
  const GET = 'GET';
  const POST = 'POST';
  const PUT = 'PUT';
  const DELETE = 'DELETE';

  return {
    comments: {
      _commentID: (val1: number | string) => {
        const prefix1 = `${PATH0}/${val1}`;

        return {
          /**
           * サインインしているユーザーで、指定されたコメントを更新する
           * @param option.body - リクエストパラメータ
           */
          put: (option: { body: Methods_1mt0zrm['put']['reqBody'], config?: T | undefined }) =>
            fetch<void, BasicHeaders, Methods_1mt0zrm['put']['status']>(prefix, prefix1, PUT, option).send(),
          /**
           * サインインしているユーザーで、指定されたコメントを更新する
           * @param option.body - リクエストパラメータ
           */
          $put: (option: { body: Methods_1mt0zrm['put']['reqBody'], config?: T | undefined }) =>
            fetch<void, BasicHeaders, Methods_1mt0zrm['put']['status']>(prefix, prefix1, PUT, option).send().then(r => r.body),
          /**
           * サインインしているユーザーで、指定されたコメントを削除する
           */
          delete: (option?: { config?: T | undefined } | undefined) =>
            fetch<void, BasicHeaders, Methods_1mt0zrm['delete']['status']>(prefix, prefix1, DELETE, option).send(),
          /**
           * サインインしているユーザーで、指定されたコメントを削除する
           */
          $delete: (option?: { config?: T | undefined } | undefined) =>
            fetch<void, BasicHeaders, Methods_1mt0zrm['delete']['status']>(prefix, prefix1, DELETE, option).send().then(r => r.body),
          $path: () => `${prefix}${prefix1}`,
        };
      },
      /**
       * サインインしているユーザーで、指定された投稿に、本文のコメントを作成する
       * @param option.body - リクエストパラメータ
       */
      post: (option: { body: Methods_vbicos['post']['reqBody'], config?: T | undefined }) =>
        fetch<void, BasicHeaders, Methods_vbicos['post']['status']>(prefix, PATH0, POST, option).send(),
      /**
       * サインインしているユーザーで、指定された投稿に、本文のコメントを作成する
       * @param option.body - リクエストパラメータ
       */
      $post: (option: { body: Methods_vbicos['post']['reqBody'], config?: T | undefined }) =>
        fetch<void, BasicHeaders, Methods_vbicos['post']['status']>(prefix, PATH0, POST, option).send().then(r => r.body),
      $path: () => `${prefix}${PATH0}`,
    },
    posts: {
      _postID: (val1: number) => {
        const prefix1 = `${PATH1}/${val1}`;

        return {
          like: {
            /**
             * 投稿に対して、いいねを付与します。
             */
            post: (option?: { config?: T | undefined } | undefined) =>
              fetch<void, BasicHeaders, Methods_1oua0ix['post']['status']>(prefix, `${prefix1}${PATH2}`, POST, option).send(),
            /**
             * 投稿に対して、いいねを付与します。
             */
            $post: (option?: { config?: T | undefined } | undefined) =>
              fetch<void, BasicHeaders, Methods_1oua0ix['post']['status']>(prefix, `${prefix1}${PATH2}`, POST, option).send().then(r => r.body),
            $path: () => `${prefix}${prefix1}${PATH2}`,
          },
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
          /**
           * 投稿を更新します。
           * @param option.body - リクエストパラメータ
           */
          put: (option: { body: Methods_rslgc9['put']['reqBody'], config?: T | undefined }) =>
            fetch<void, BasicHeaders, Methods_rslgc9['put']['status']>(prefix, prefix1, PUT, option).send(),
          /**
           * 投稿を更新します。
           * @param option.body - リクエストパラメータ
           */
          $put: (option: { body: Methods_rslgc9['put']['reqBody'], config?: T | undefined }) =>
            fetch<void, BasicHeaders, Methods_rslgc9['put']['status']>(prefix, prefix1, PUT, option).send().then(r => r.body),
          /**
           * 投稿を削除する
           */
          delete: (option?: { config?: T | undefined } | undefined) =>
            fetch<void, BasicHeaders, Methods_rslgc9['delete']['status']>(prefix, prefix1, DELETE, option).send(),
          /**
           * 投稿を削除する
           */
          $delete: (option?: { config?: T | undefined } | undefined) =>
            fetch<void, BasicHeaders, Methods_rslgc9['delete']['status']>(prefix, prefix1, DELETE, option).send().then(r => r.body),
          $path: () => `${prefix}${prefix1}`,
        };
      },
      /**
       * 投稿一覧を取得します
       * @returns OK
       */
      get: (option?: { config?: T | undefined } | undefined) =>
        fetch<Methods_1kz9onh['get']['resBody'], BasicHeaders, Methods_1kz9onh['get']['status']>(prefix, PATH1, GET, option).json(),
      /**
       * 投稿一覧を取得します
       * @returns OK
       */
      $get: (option?: { config?: T | undefined } | undefined) =>
        fetch<Methods_1kz9onh['get']['resBody'], BasicHeaders, Methods_1kz9onh['get']['status']>(prefix, PATH1, GET, option).json().then(r => r.body),
      /**
       * サインインしているユーザーで、指定されたタイトル、本文の投稿を作成する
       * @param option.body - リクエストパラメータ
       */
      post: (option: { body: Methods_1kz9onh['post']['reqBody'], config?: T | undefined }) =>
        fetch<void, BasicHeaders, Methods_1kz9onh['post']['status']>(prefix, PATH1, POST, option).send(),
      /**
       * サインインしているユーザーで、指定されたタイトル、本文の投稿を作成する
       * @param option.body - リクエストパラメータ
       */
      $post: (option: { body: Methods_1kz9onh['post']['reqBody'], config?: T | undefined }) =>
        fetch<void, BasicHeaders, Methods_1kz9onh['post']['status']>(prefix, PATH1, POST, option).send().then(r => r.body),
      $path: () => `${prefix}${PATH1}`,
    },
    signin: {
      /**
       * usernameとpasswordでsigninします。
       * @param option.body - リクエストパラメータ
       * @returns OK
       */
      post: (option: { body: Methods_1oqkkb0['post']['reqBody'], config?: T | undefined }) =>
        fetch<Methods_1oqkkb0['post']['resBody'], BasicHeaders, Methods_1oqkkb0['post']['status']>(prefix, PATH3, POST, option).json(),
      /**
       * usernameとpasswordでsigninします。
       * @param option.body - リクエストパラメータ
       * @returns OK
       */
      $post: (option: { body: Methods_1oqkkb0['post']['reqBody'], config?: T | undefined }) =>
        fetch<Methods_1oqkkb0['post']['resBody'], BasicHeaders, Methods_1oqkkb0['post']['status']>(prefix, PATH3, POST, option).json().then(r => r.body),
      $path: () => `${prefix}${PATH3}`,
    },
    users: {
      me: {
        /**
         * ログインしているユーザーの情報を取得します
         * @returns OK
         */
        get: (option?: { config?: T | undefined } | undefined) =>
          fetch<Methods_jzr18p['get']['resBody'], BasicHeaders, Methods_jzr18p['get']['status']>(prefix, PATH5, GET, option).json(),
        /**
         * ログインしているユーザーの情報を取得します
         * @returns OK
         */
        $get: (option?: { config?: T | undefined } | undefined) =>
          fetch<Methods_jzr18p['get']['resBody'], BasicHeaders, Methods_jzr18p['get']['status']>(prefix, PATH5, GET, option).json().then(r => r.body),
        $path: () => `${prefix}${PATH5}`,
      },
      /**
       * usernameとpasswordでuserを作成します。
       * @param option.body - リクエストパラメータ
       * @returns OK
       */
      post: (option: { body: Methods_1xhiioa['post']['reqBody'], config?: T | undefined }) =>
        fetch<Methods_1xhiioa['post']['resBody'], BasicHeaders, Methods_1xhiioa['post']['status']>(prefix, PATH4, POST, option).json(),
      /**
       * usernameとpasswordでuserを作成します。
       * @param option.body - リクエストパラメータ
       * @returns OK
       */
      $post: (option: { body: Methods_1xhiioa['post']['reqBody'], config?: T | undefined }) =>
        fetch<Methods_1xhiioa['post']['resBody'], BasicHeaders, Methods_1xhiioa['post']['status']>(prefix, PATH4, POST, option).json().then(r => r.body),
      $path: () => `${prefix}${PATH4}`,
    },
  };
};

export type ApiInstance = ReturnType<typeof api>;
export default api;

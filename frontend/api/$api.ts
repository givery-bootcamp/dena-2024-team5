import type { AspidaClient, BasicHeaders } from 'aspida';
import type { Methods as Methods_cimu1m } from './post/_postId@number';
import type { Methods as Methods_1kz9onh } from './posts';
import type { Methods as Methods_1oqkkb0 } from './signin';

const api = <T>({ baseURL, fetch }: AspidaClient<T>) => {
  const prefix = (baseURL === undefined ? '//localhost:9000' : baseURL).replace(/\/$/, '');
  const PATH0 = '/post';
  const PATH1 = '/posts';
  const PATH2 = '/signin';
  const GET = 'GET';
  const POST = 'POST';

  return {
    post: {
      _postId: (val1: number) => {
        const prefix1 = `${PATH0}/${val1}`;

        return {
          /**
           * 投稿の詳細を取得します
           * @returns OK
           */
          get: (option?: { config?: T | undefined } | undefined) =>
            fetch<Methods_cimu1m['get']['resBody'], BasicHeaders, Methods_cimu1m['get']['status']>(prefix, prefix1, GET, option).json(),
          /**
           * 投稿の詳細を取得します
           * @returns OK
           */
          $get: (option?: { config?: T | undefined } | undefined) =>
            fetch<Methods_cimu1m['get']['resBody'], BasicHeaders, Methods_cimu1m['get']['status']>(prefix, prefix1, GET, option).json().then(r => r.body),
          $path: () => `${prefix}${prefix1}`,
        };
      },
    },
    posts: {
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
      $path: () => `${prefix}${PATH1}`,
    },
    signin: {
      /**
       * usernameとpasswordでsigninします。
       * @param option.body - リクエストパラメータ
       * @returns OK
       */
      post: (option: { body: Methods_1oqkkb0['post']['reqBody'], config?: T | undefined }) =>
        fetch<Methods_1oqkkb0['post']['resBody'], BasicHeaders, Methods_1oqkkb0['post']['status']>(prefix, PATH2, POST, option).json(),
      /**
       * usernameとpasswordでsigninします。
       * @param option.body - リクエストパラメータ
       * @returns OK
       */
      $post: (option: { body: Methods_1oqkkb0['post']['reqBody'], config?: T | undefined }) =>
        fetch<Methods_1oqkkb0['post']['resBody'], BasicHeaders, Methods_1oqkkb0['post']['status']>(prefix, PATH2, POST, option).json().then(r => r.body),
      $path: () => `${prefix}${PATH2}`,
    },
  };
};

export type ApiInstance = ReturnType<typeof api>;
export default api;

import type { AspidaClient, BasicHeaders } from 'aspida';
import type { Methods as Methods_1kz9onh } from './posts';

const api = <T>({ baseURL, fetch }: AspidaClient<T>) => {
  const prefix = (baseURL === undefined ? '' : baseURL).replace(/\/$/, '');
  const PATH0 = '/posts';
  const GET = 'GET';

  return {
    posts: {
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
      $path: () => `${prefix}${PATH0}`,
    },
  };
};

export type ApiInstance = ReturnType<typeof api>;
export default api;

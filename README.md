# Training app 2024
## docker-compose structure

- backend:
  - go: 1.22
  - air: 1.51.0
    - https://github.com/cosmtrek/air
- frontend:
  - node:20.12.2
  - react: 18
    - https://reactjs.org/docs/getting-started.html
  - @reduxjs/toolkit: 1.9
    - https://redux-toolkit.js.org/introduction/getting-started
  - react-redux: 8
    - https://react-redux.js.org/introduction/getting-started
  - react-router-dom: 6
    - https://v5.reactrouter.com/web/guides/philosophy
  - bootstrap: 5
    - https://getbootstrap.com/docs/5.1/getting-started/introduction/
  - classnames: 2.3
    - https://github.com/JedWatson/classnames
  - typescript: 5
    - https://www.typescriptlang.org/docs/
- db:
  - mysql: 8.3

## How to develop

```
$ docker-compose up
```

- backend: `http://localhost:9000`
- frontend: `http://localhost:3000`

でWebサーバが起動します。

### Initial setup

Reactを開発する人はブラウザの拡張機能をインストールしてください。(任意)

- React Developer Tools
- Redux DevTools

## How to reset database

`mysql/sql`内のsqlコマンドファイルが更新されたら、以下のdownコマンドでdbをリセットしてください。
```
docker-compose down -v
```

## How to connect database

```
host$ docker-compose exec db mysql training
```

## How to connect backend shell

```
host$ docker-compose exec backend bash
```

ライブラリをインストールする場合はdockerコンテナ側でコマンドを実行してください。

e.g.

```
host$ docker-compose exec backend bash
backend$ go get -u gorm.io/gorm
```

## OpenAPI(swagger)
<http://localhost:9000/swagger/index.html>にアクセスすると確認できます。

### re-generate swagger file

swaggerファイルの再生成は以下のコマンドを実行してください。
```
make swag
```

## How to test go
```
make test
```

### how to write doc

1. 各endpointに対応する関数(controllers層)に対して記述してください。
2. `backend/internal/controllers/post_get_list.go`の`GetList`の書き方を参考にdocを記述してください。


## How to develop frontend
```bash
host$ cd frontend
host$ pnpm install
host$ pnpm dev
# pnpm入ってない人向け
host$ npm install -g pnpm
```

### ローカル用に環境変数

`.env.template`をコピーして、`.env.local`を作成

[frontend(nodejs)をDocker外で動かすための設定変更](https://github.com/givery-technology/training-app-2023/wiki/Docker%E3%81%AE%E4%B8%AD%E3%81%AENode%E4%BD%BF%E3%81%86%E3%81%AE%E3%81%84%E3%82%84%E3%81%A0%E3%81%A8%E6%80%9D%E3%81%A3%E3%81%9F%E4%BA%BA%E5%90%91%E3%81%91%E3%81%AE%E8%84%B1%E7%8D%84%E3%81%AE%E6%89%8B%E5%BC%95%E3%81%8D)


## ディレクトリ構成

### Backend
```
backend/
  internal/ : ソースコード
    config/ : 設定類
    entity/ : モデル/エンティティ
    external/ : 外部環境との接続定義
    interfaces/ : インターフェース
    middleware/ : ginのmiddleware
    repository/ : リポジトリ - systemに近い部分の実装
    usecase/ : ユースケース - ビジネスに近い部分の実装
```

### Frontend

```
frontend/
  index.html
  public/
    画像などの静的ファイル
  src/
    main.tsx: Reactアプリケーションが起動するエントリーポイント
    app/
      機能横断的に使う機能をまとめる
    features/
      post/
        ドメインごとの機能をまとめる
    shared/
      components/
        再利用可能な小さなUIコンポーネント
      services/
        共有関数
      hooks/
        共有React Hook
      models/
        共有Model
      store/
        Redux Store関連
```

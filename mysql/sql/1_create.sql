CREATE DATABASE IF NOT EXISTS training;
USE training;

CREATE TABLE IF NOT EXISTS hello_worlds(
  lang    VARCHAR(2) NOT NULL PRIMARY KEY,
  message VARCHAR(40) NOT NULL
);

CREATE TABLE IF NOT EXISTS users(
  id         INT                      AUTO_INCREMENT PRIMARY KEY,
  name       VARCHAR(40)              NOT NULL,
  password   VARCHAR(100)             NOT NULL,
  user_type  ENUM('normal', 'zombie') NOT NULL DEFAULT 'normal',
  created_at DATETIME                 NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME                 NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  deleted_at DATETIME                 NULL
);

CREATE TABLE IF NOT EXISTS posts(
  id         INT          AUTO_INCREMENT PRIMARY KEY,
  user_id    INT          NOT NULL,
  title      VARCHAR(100) NOT NULL,
  body       TEXT         NOT NULL,
  image_url  TEXT         NOT NULL DEFAULT (""),
  created_at DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  deleted_at DATETIME     NULL,
  FOREIGN KEY (user_id) REFERENCES users (id)
);

CREATE TABLE IF NOT EXISTS comments(
  id         INT          AUTO_INCREMENT PRIMARY KEY,
  user_id    INT          NOT NULL,
  post_id    INT          NOT NULL,
  body       TEXT         NOT NULL,
  created_at DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  deleted_at DATETIME     NULL,
  FOREIGN KEY (user_id) REFERENCES users (id),
  FOREIGN KEY (post_id) REFERENCES posts (id)
);

CREATE TABLE IF NOT EXISTS likes(
  id         INT      AUTO_INCREMENT PRIMARY KEY,
  user_id    INT      NOT NULL,
  post_id    INT      NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users (id),
  FOREIGN KEY (post_id) REFERENCES posts (id),
  UNIQUE (user_id, post_id)
);

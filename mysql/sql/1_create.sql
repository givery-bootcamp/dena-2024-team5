CREATE DATABASE IF NOT EXISTS training;
USE training;

CREATE TABLE IF NOT EXISTS hello_worlds(
  lang    VARCHAR(2) NOT NULL PRIMARY KEY,
  message VARCHAR(40) NOT NULL
);

CREATE TABLE IF NOT EXISTS users(
  id         INT          AUTO_INCREMENT PRIMARY KEY,
  name       VARCHAR(40)  NOT NULL,
  password   VARCHAR(100) NOT NULL,
  created_at DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  deleted_at DATETIME     NULL
);

CREATE TABLE IF NOT EXISTS posts(
  id         INT          AUTO_INCREMENT PRIMARY KEY,
  user_id    INT          NOT NULL,
  title      VARCHAR(100) NOT NULL,
  body       TEXT         NOT NULL,
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

CREATE TABLE IF NOT EXISTS notifications (
  id        INT          AUTO_INCREMENT PRIMARY KEY,
  user_id   INT          NOT NULL,
  post_id   INT          NOT NULL,
  message   VARCHAR(255) NOT NULL,
  created_at DATETIME    NOT NULL DEFAULT CURRENT_TIMESTAMP
);

DELIMITER //
CREATE TRIGGER notify_new_comment
AFTER INSERT ON comments
FOR EACH ROW
BEGIN
  DECLARE msg VARCHAR(255);
  DECLARE n_user_id INT;
  DECLARE n_post_id INT;
  SELECT user_id, id INTO n_user_id, n_post_id FROM posts WHERE id = NEW.post_id;
  SET msg = CONCAT('New comment on your post ', NEW.post_id, ' by user ', NEW.user_id);
  INSERT INTO notifications (user_id, post_id, message, created_at) VALUES (n_user_id, n_post_id, msg, NOW());
END //
DELIMITER ;

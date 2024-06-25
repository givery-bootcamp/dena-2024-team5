INSERT INTO hello_worlds (lang, message) VALUES ('en', 'Hello World');
INSERT INTO hello_worlds (lang, message) VALUES ('ja', 'こんにちは 世界');

INSERT INTO users (name, password) VALUES ('taro', 'password');
INSERT INTO users (name, password) VALUES ('hanako', 'PASSWORD');
INSERT INTO users (name, password)
VALUES
    ('zombie_user1', 'password'),
    ('zombie_user2', 'password'),
    ('zombie_user3', 'password'),
    ('zombie_user4', 'password'),
    ('zombie_user5', 'password'),
    ('zombie_user6', 'password'),
    ('zombie_user7', 'password'),
    ('zombie_user8', 'password'),
    ('zombie_user9', 'password'),
    ('zombie_user10', 'password');

INSERT INTO posts (user_id, title, body) VALUES (1, 'test1', '質問1\n改行');
INSERT INTO posts (user_id, title, body) VALUES (1, 'test2', '質問2\n改行');
INSERT INTO posts (user_id, title, body) VALUES (1, 'test3', '質問3\n改行');
INSERT INTO posts (user_id, title, body) VALUES (1, 'test4', '質問4\n改行');

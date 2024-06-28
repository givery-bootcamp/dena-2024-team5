INSERT INTO hello_worlds (lang, message) VALUES ('en', 'Hello World');
INSERT INTO hello_worlds (lang, message) VALUES ('ja', 'こんにちは 世界');

INSERT INTO users (name, password) VALUES ('taro', 'ed07535c8da6cd09a852bb4efcc7e818db829a387b47a505b586a4b6926473d6');
INSERT INTO users (name, password) VALUES ('hanako', 'c44d3aceb5c0859e1d6358e74668fe23990d298be5c70c3cdee875a754f58262');
INSERT INTO users (name, password, user_type)
VALUES
    ('zombie_user1', 'password', 'zombie'),
    ('zombie_user2', 'password', 'zombie'),
    ('zombie_user3', 'password', 'zombie'),
    ('zombie_user4', 'password', 'zombie'),
    ('zombie_user5', 'password', 'zombie'),
    ('zombie_user6', 'password', 'zombie'),
    ('zombie_user7', 'password', 'zombie'),
    ('zombie_user8', 'password', 'zombie'),
    ('zombie_user9', 'password', 'zombie'),
    ('zombie_user10', 'password', 'zombie');

INSERT INTO posts (user_id, title, body) VALUES (1, 'test1', '質問1\n改行');
INSERT INTO posts (user_id, title, body) VALUES (1, 'test2', '質問2\n改行');
INSERT INTO posts (user_id, title, body) VALUES (1, 'test3', '質問3\n改行');
INSERT INTO posts (user_id, title, body) VALUES (1, 'test4', '質問4\n改行');

INSERT INTO comments (user_id, post_id, body) VALUES (1, 1, '最初のコメント');
INSERT INTO comments (user_id, post_id, body) VALUES (2, 2, 'コメント2');

INSERT INTO likes (user_id, post_id) VALUES (1, 1);

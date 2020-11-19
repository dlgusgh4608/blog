CREATE EXTENSION IF NOT EXISTS 'uuid-ossp';

CREATE TABLE IF NOT EXISTS "user" (
    id UUID NOT NULL PRIMARY KEY DEFALUT uuid_generate_v4(),
    nickname TEXT NOT NULL,
    email TEXT NOT NULL,
    password TEXT NOT NULL,
);

CREATE TABLE IF NOT EXISTS "post" (
    id UUID NOT NULL PRIMARY KEY DEFALUT uuid_generate_v4(),
    user_id UUID NOT NULL DEFALUT uuid_generate_v4(),
    content: TEXT NOT NULL,
);

CREATE TABLE IF NOT EXISTS "comment" (
    id UUID NOT NULL PRIMARY KEY DEFALUT uuid_generate_v4(),
    user_id NOT NULL DEFAULT uuid_generate_v4(),
    post_id NOT NULL DEFAULT uuid_generate_v4(),
    content: TEXT NOT NULL,
);

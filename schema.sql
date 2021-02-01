CREATE SCHEMA IF NOT EXISTS catsta_gram;

USE catsta_gram;

CREATE TABLE users (
    id VARCHAR(60) NOT NULL,
    first_name VARCHAR(60) NULL,
    last_name VARCHAR(60) NULL,
    username VARCHAR(60) NOT NULL UNIQUE,
    email VARCHAR(60) NOT NULL UNIQUE,
    password VARCHAR(60) NOT NULL,
    is_visible CHAR(1) DEFAULT 'y',
    created_at TIMESTAMP DEFAULT NOW(),
    PRIMARY KEY (id)
);

CREATE TABLE posts (
    id VARCHAR(60) NOT NULL,
    user_id VARCHAR(60) NOT NULL,
    photo_url VARCHAR(255) NOT NULL,
    caption VARCHAR(144) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES users (id)
);
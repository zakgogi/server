DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id serial PRIMARY KEY,
    username varchar(60) NOT NULL UNIQUE,
    email varchar(255) NOT NULL UNIQUE,
    password varchar(255) NOT NULL
);

DROP TABLE IF EXISTS habits;

CREATE TABLE habits (
    id serial PRIMARY KEY, 
    habitname varchar(50) NOT NULL,
    times_completed int NOT NULL, 
    frequency_day int NOT NULL, 
    streak int NOT NULL,
    username_id int NOT NULL
    -- frequencyWeek int,
    -- startDate
);

DROP TABLE IF EXISTS badges;

CREATE TABLE badges (
    id serial PRIMARY KEY, 
    badge_name varchar(50) NOT NULL,
    username_id int NOT NULL 
);


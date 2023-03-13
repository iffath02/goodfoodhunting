CREATE DATABASE goodfoodhunting;

CREATE TABLE dishes (
    id SERIAL PRIMARY KEY,
    title TEXT,
    image_url TEXT
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email TEXT,
    password_digest TEXT
);

INSERT INTO dishes(title, image_url) VALUES ('cake', 'https://preppykitchen.com/wp-content/uploads/2018/04/Funfetti-cake-recipe-new.jpg');
INSERT INTO dishes(title, image_url) VALUES ('pudding', 'https://preppykitchen.com/wp-content/uploads/2018/04/Funfetti-cake-recipe-new.jpg');
INSERT INTO dishes(title, image_url) VALUES ('cake', 'https://www.michels.com.au/app/uploads/2020/03/MP3960-Website-ClickCollect-Update_Images8.jpg');

INSERT INTO users (email) values ('ifsgr8leo@gmail.com');
INSERT INTO users (email) values ('iffathfatima02@gmail.com');
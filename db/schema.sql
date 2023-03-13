CREATE DATABASE goodfoodhunting;

CREATE TABLE dishes (
    id SERIAL PRIMARY KEY,
    title TEXT,
    image_url TEXT,
    user_id INTEGER
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email TEXT,
    password_digest TEXT
);

INSERT INTO dishes(title, image_url) VALUES ('cake', 'https://preppykitchen.com/wp-content/uploads/2018/04/Funfetti-cake-recipe-new.jpg');
INSERT INTO dishes(title, image_url) VALUES ('pudding', 'https://preppykitchen.com/wp-content/uploads/2018/04/Funfetti-cake-recipe-new.jpg');
INSERT INTO dishes(title, image_url) VALUES ('cake', 'https://www.michels.com.au/app/uploads/2020/03/MP3960-Website-ClickCollect-Update_Images8.jpg');

INSERT INTO users (email, password_digest) values ('ifsgr8leo@gmail.com', '$2b$10$wJdT0Vnljore1MAfo1T69.rqgdWS.pws3UsW1josimmJNAXpeWWPq');
INSERT INTO users (email, password_digest) values ('iffathfatima02@gmail.com', 'pudding');

ALTER TABLE dishes ADD COLUMN user_id INTEGER;
DROP TABLE IF EXISTS books;

CREATE TABLE books (
    id      INTEGER     PRIMARY KEY NOT NULL ,
    author  VARCHAR(25) NOT NULL ,
    title   VARCHAR(40) NOT NULL ,
    genre   VARCHAR(20) NOT NULL ,
    price   FLOAT       NOT NULL ,
    CONSTRAINT BOOK_EXISTS_UNIQUE UNIQUE (title, author)
);
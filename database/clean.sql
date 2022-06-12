CREATE TABLE books (
    id      INTEGER     PRIMARY KEY NOT NULL ,
    author  VARCHAR(25) NOT NULL ,
    title   VARCHAR(40) NOT NULL ,
    genre   VARCHAR(20) NOT NULL ,
    price   FLOAT       NOT NULL ,
    CONSTRAINT BOOK_EXISTS_UNIQUE UNIQUE (title, author)
);

INSERT INTO books (author, title, genre, price) values ('George Orwell', '1984', 'Fiction', 15);
INSERT INTO BOOKS (AUTHOR, TITLE, GENRE, PRICE) VALUES ('Randomas', 'Random Book', 'Romance', 20.2);

DROP TABLE books;

SELECT books.title, books.author, books.genre, books.price FROM books WHERE title LIKE '1%';

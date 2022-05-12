// Code from https://mariadb.com/resources/blog/getting-started-with-connector-node-js/
// Express seems to be an HTTP application, I am going to use AJAX, not express

// Requirements
const express = require('express');
const db = require('./db');
const cors = require('cors');

const app = express();
const port = 8080;
const bodyParser = require('body-parser');
// Cannot use requests.js because of cors, installing it

let {response} = require("express");
const path = require("path");
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

// GET for Searching books
app.get('/books/search', async (req, res) => {
    try {
        const query = req.query.q;
        console.log(`User searched for ${query}`);
        const result = await db.pool.query(`SELECT books.TITLE, books.AUTHOR, books.GENRE, books.PRICE FROM Library.books WHERE TITLE LIKE '${query}%'`);
        res.send(result)
    } catch (err) {
        throw err;
    }
});

// GET for fetching all books (TEMP)
app.get('/books/all', async (req, res) => {
    try {
        const result = await db.pool.query("SELECT * FROM Library.books");
        res.send(result);
    } catch (err) {
        throw err;
    }
});

// POST for inserting books
app.post('/books/', async (req, res) => {
    // TODO: Try-Catch block
    console.log(req);
    response = {
        author: req.body.author,
        title:  req.body.title,
        genre:  req.body.genre,
        price:  req.body.price
    };

    console.log(response);
    res.end(JSON.stringify(response));
    try {
        await db.pool.query(`INSERT INTO books (AUTHOR, TITLE, GENRE, PRICE) VALUE ('${response.author.toString()}', '${response.title.toString()}', '${response.genre.toString()}', '${parseFloat(response.price)}')`);
        // res.send(result)
    } catch (err) {
        throw err;
    }
});

// Listing to 8080 port
app.listen(port, () => console.log(`Listening on port ${port}`));
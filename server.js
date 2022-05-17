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
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Rendering
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'))

// GET for Searching books
app.get('/books/search', async (req, res) => {
    try {
        const query = req.query.q;
        console.log(`User searched for ${query}`);
        const result = await db.pool.query(`SELECT books.TITLE, books.AUTHOR, books.GENRE, books.PRICE FROM Library.books WHERE TITLE LIKE '${query}%'`);

        // Create an HTML page with results
        let searchResult = [];
        for (let i of result) {
            let result = {
                'author': i.AUTHOR,
                'title': i.TITLE,
                'genre': i.GENRE,
                'price': i.PRICE
            };
            searchResult.push(result);
        }

        // FIXME: searchTerm does not display on title.
        res.render('search.pug', {"searchResult": searchResult, "searchTerm": req.query.q.toString()});
    } catch (err) {
        throw err;
    }
});

// GET @ /new-book for form submit
app.get('/books/new', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/books/new.html'));
});

// POST @ /new-book/submit for inserting books @ mariadb
app.post('/books/new', async (req, res) => {
    response = {
        author: req.body.author.toString(),
        title:  req.body.title.toString(),
        genre:  req.body.genre.toString(),
        price:  req.body.price
    };

    console.log(JSON.stringify(response));
    try {
        await db.pool.query(`INSERT INTO books (AUTHOR, TITLE, GENRE, PRICE) VALUE ('${response.author}', '${response.title}', '${response.genre}', '${parseFloat(response.price)}')`);
    } catch (err) {
        throw err;
    }
});


// ==============================
//          Temporary

// GET for fetching all books (TEMP)
app.get('/books/all', async (req, res) => {
    try {
        const result = await db.pool.query("SELECT * FROM Library.books");
        res.send(result);
    } catch (err) {
        throw err;
    }
});

//          Temporary
// ==============================


// Listing to 8080 port
app.listen(port, () => console.log(`Listening on port ${port}`));

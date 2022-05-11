// Code from https://mariadb.com/resources/blog/getting-started-with-connector-node-js/
// Express seems to be an HTTP application, I am going to use AJAX, not express

const express = require('express')
const db = require('./db')
const app = express()
const port = 8080
const bodyParser = require('body-parser')
// Cannot use requests.js because of cors, installing it
const cors = require('cors')
let {response} = require("express");

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// GET (search)
app.get('/books/search', async (req, res) => {
    try {
        const result = await db.pool.query("select * from books");
        res.send(result)
    } catch (err) {
        throw err;
    }
});

// POST (insert)
app.post('/books/', async (req, res) => {
    // TODO: Try-Catch block
    // console.log(req)
    response = {
        author: req.body.author,
        title:  req.body.title,
        genre:  req.body.genre,
        price:  req.body.price
    };

    console.log(response)
    res.end(JSON.stringify(response));
    try {
        const result = await db.pool.query(`INSERT INTO books (AUTHOR, TITLE, GENRE, PRICE) VALUE ('${response.author.toString()}', '${response.title.toString()}', '${response.genre.toString()}', '${parseFloat(response.price)}')`);
        // const result = await db.pool.query("INSERT INTO Library.books (AUTHOR, TITLE, GENRE, PRICE) VALUE ('LOL', 'LOL', 'LOL', 123.2)")
        res.send(result)
    } catch (err) {
        throw err;
    }
});

// Used for insertions
app.listen(port, () => console.log(`Listening on port ${port}`));
// Requirements
const express = require('express')
const db = require('./sqllitedb').db

const app = express()
const PORT = process.env.PORT || 5000;
const bodyParser = require('body-parser');
// Cannot use requests.js because of cors, installing it

let { response } = require("express");
const path = require("path");
app.use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: true }))
    .use(express.static('public'))
    .set('view engine', 'pug')
    .set('views', path.join(__dirname, 'views'))

//      Extra API endpoints
// ==============================

// GET @ /books/search for Searching books
app.get('/books/search', async (req, res) => {
    try {
        // Fetching query from the form
        const query = req.query.q;

        // sqlite query with Try-Catch
        let queryResult;
        try {
            const stmt = db.prepare('SELECT books.id, books.title, books.author, books.genre, books.price FROM books WHERE books.title LIKE ?');
            queryResult = stmt.all(query + '%');
        }
        catch (err) {
            // FIXME: When an error is thrown I want to log the date correctly, with leading 0 and whatever.
            const date = new Date;
            const curDate = `${date.getFullYear()}-${date.getMonth()}-${date.getDay()} ${date.getHours()}:${date.getMinutes()}`;

            console.log(err.code + ' :: ' + curDate);

            res.render('result.pug', {
                result: 'Server error. Please try accessing the site later.',
                result_title: 'Server error'
            });

            return;
        }

        // If no books exist from this query, print according message
        if (queryResult.length === 0) {
            res.render('result.pug', {
                "result": `😱 Searched for '${query}' but found nothing! Try adding the book in our system!`,
                "result_title": `Searched for ${query}`
            })
            return;
        }

        // Render HTML page with results
        let searchResult = [];
        queryResult.forEach((q) => {
            searchResult.push({
                'id': q.id,
                'author': q.author,
                'title': q.title,
                'genre': q.genre,
                'price': q.price
            });
        });
        res.render('search.pug', {
            "searchResult": searchResult,
            "searchTerm": req.query.q.toString()
        });
    } catch (err) {
        throw err;
    }
});

//      End of extra endpoints
// ==============================



// ==============================
//      Required API endpoints

// Root website access
app.get('/', (req, res) => {
    res.sendFile('index.html');
});

// Searching for books
// Used when checkbox 'Result as JSON' is checked
app.get('/books', async (req, res) => {
    try {
        const query = req.query.q;
        // Fetching query results from Database
        const dbQuery = db.prepare('SELECT books.id, books.title, books.author, books.genre, books.price FROM books WHERE books.title LIKE ?').all(query + '%');

        // If no results are returned, print according message
        if (dbQuery.length === 0) {
            res.send(`
            <html lang="en">
                <head>
                    <title> Searched for ${query} </title>
                </head>
                <body>
                    <p> No results found with key ${query}. </p>
                </body>
            </html>
            `);
        } else {
            res.send(dbQuery);
        }
    } catch (err) {
        const date = new Date;
        const curDate = `${date.getFullYear()}-${date.getMonth()}-${date.getDay()} ${date.getHours()}:${date.getMinutes()}`;

        console.log(err.code + ' :: ' + curDate);
    }
});

app.post('/books', async (req, res) => {
    response = {
        author: req.body.author.toString(),
        title: req.body.title.toString(),
        genre: req.body.genre.toString(),
        price: req.body.price
    };

    try {
        // sqlite insertion
        let dbRun;
        try {
            dbRun = db.prepare('INSERT INTO books (author, title, genre, price) VALUES (?, ?, ?, ?)').run(
                response.author,
                response.title,
                response.genre,
                response.price
            );
        } catch (err) {
            console.log(err.code);
            dbRun = {
                code: err.code,
                changes: 0
            };
        }

        // Rendering result page
        let success = {
            text: '',
            title: ''
        };

        if (dbRun.changes === 1) {
            success.text = `🥳 Inserted new book with title "${response.title}" successfully!`;
            success.title = 'Success';
        } else if (dbRun.code === 'SQLITE_CONSTRAINT_UNIQUE') {
            success.text = '😥 Book exists in database. Please try inserting other books.';
            success.title = 'Book exists'
        } else {
            success.text = '😱 Unsuccessful book insertion. Please try again.';
            success.title = 'Error'
        };

        res.render('result.pug', {
            "result": success.text,
            "result_title": success.title
        });
    } catch (err) {
        throw err;
    }
});

//      End of req. API endpoints
// ==============================

app.listen(PORT, () => console.log(`Server open locally @ http://localhost:${PORT}`));
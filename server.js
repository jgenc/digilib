// Code from https://mariadb.com/resources/blog/getting-started-with-connector-node-js/
// Express seems to be an HTTP application, I am going to use AJAX, not express

const express = require('express')
const db = require('./db')
const app = express()
const port = 8080
const bodyParser = require('body-parser')
// Cannot use requests.js because of cors, installing it
const cors = require('cors')

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// GET
app.get('/books', async (req, res) => {
    try {
        const result = await db.pool.query("select * from books");
        res.send(result)
    } catch (err) {
        throw err;
    }
});

app.listen(port, () => console.log(`Listening on port ${port}`));
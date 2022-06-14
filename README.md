# Project 2022 - Web Application Technologies

## Public Website

- [digilib.info](http://digilib.info)
- [www.digilib.info](http://www.digilib.info)

## Demo

![demo](https://user-images.githubusercontent.com/65038606/173586074-a57f63a2-a762-490e-8c20-fbb24ab403aa.gif)

## Frontend

- public/index.html
- public/style.css

## Backend

- server.js και τα endpoints
    1. GET  '/'                 - Επιστρέφει στατικά το homepage της σελίδας
    2. GET  '/books'            - Επιστρέφει το αποτέλεσμα της αναζήτησης βιβλίων σε JSON
    3. POST '/books'            - INSERT στην βάση με το βιβλίο
    4. GET  '/books/search/'    - Επιστρέφει το αποτέλεσμα της αναζήτησης βιβλίων μέσω pug template

## Database

- Ο φάκελος database περιέχει το αρχείο sqlite3 με όνομα Library.db
- Υπάρχουν 2 SQL αρχεία
    1. clean.sql    - Διαγράφει τον πίνακα αν υπάρχει και τον δημιουργεί,
    2. inserts.sql  - Βάζει στην βάση κάποια default βιβλία

## Views

- Το render engine του backend είναι το pug (rename from jade) και χρησιμοποιεί 2 templates
    1. result.pug   - Εμφανίζει error και success messages
    2. search.pug   - Εμφανίζει τα αποτελέσματα του /books/search endpoint

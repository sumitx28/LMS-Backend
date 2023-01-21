const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require('./models/index');

db.sequelize.authenticate()
.then(() => console.log('DB Connected'))
.catch(() => console.log('Error connecting to DB'));

db.sequelize.sync({logging : false})
.then(() => console.log('synced'))
.catch(() => console.log('Unable to sync'));

/*
    Routes
    1. GET '/books' -> fetch and returns all book records from the Database
    2. POST '/books/ -> Inserts the given new book data in the Database
    3. PUT '/books/id -> Updates the book record of the given id
    4. DELETE '/books/id -> Deletes the book record for given id
*/

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

const libraryRoute = require('./Routes/library');
app.use('/library' , libraryRoute);

app.listen(process.env.PORT || 3000 , () => {
    console.log(`App listening on Port : ${process.env.PORT || 3000}`);
})
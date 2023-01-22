const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require('./models/index');

app.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Credentials", "true");
	res.setHeader("Access-Control-Max-Age", "1800");
	res.setHeader("Access-Control-Allow-Headers", "content-type");
	res.setHeader("Access-Control-Allow-Methods","PUT, POST, GET, DELETE, PATCH, OPTIONS");
    next();
});

db.sequelize.authenticate()
.then(() => console.log('DB Connected'))
.catch(() => console.log('Error connecting to DB'));

db.sequelize.sync({force : false})
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
app.use(express.static('test-app'));

const libraryRoute = require('./Routes/library');
app.use('/library' , libraryRoute);

app.listen(process.env.PORT || 3000 , () => {
    console.log(`App listening on Port : ${process.env.PORT || 3000}`);
})
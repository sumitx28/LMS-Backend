const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require('./models/index');
const sessions = require('express-session');
const cors = require('cors');
const ONE_DAY = 1000 * 60 * 60 * 24;

/*
    API Routes
    1. GET '/books' -> fetch and returns all book records from the Database
    2. POST '/books/ -> Inserts the given new book data in the Database
    3. PUT '/books/id -> Updates the book record of the given id
    4. DELETE '/books/id -> Deletes the book record for given id
    5. GET '/books/available-books -> Returns an Array of Books which are avilable in the library
    6. GET '/books/issued-books -> Returns an Array of books which are issued.
    7. GET '/books/id -> Find book for the given id
    8. POST '/books/issue/id -> Issues the book of Id along with Given Name
    9. POST '/books/return/id -> Updates book status to returned.
*/

// Database Connection
db.sequelize.authenticate()
.then(() => console.log('DB Connected'))
.catch(() => console.log('Error connecting to DB'));

// Sync Database
db.sequelize.sync({force : false})
.then(() => console.log('synced'))
.catch(() => console.log('Unable to sync'));

app.use(sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: ONE_DAY },
    resave: false
}));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static('LMS-Frontend'));

// Auth Route
const authRoute = require('./Routes/auth');
app.use('/auth' , authRoute);

// Library Route
const libraryRoute = require('./Routes/library');
app.use('/library' , libraryRoute);

app.listen(process.env.PORT || 3000 , () => {
    console.log(`App listening on Port : ${process.env.PORT || 3000}`);
})
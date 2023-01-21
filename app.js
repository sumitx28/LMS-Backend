const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

const libraryRoute = require('./Routes/library');
app.use('/library' , libraryRoute);

app.listen(process.env.PORT || 3000 , () => {
    console.log(`App listening on Port : ${process.env.PORT || 3000}`);
})
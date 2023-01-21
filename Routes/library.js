const express = require('express');
const router = express.Router();

router
    .route('/books')
    /*
         GET '/books' -> fetch and returns all book records from the Database
    */
    .get((req , res) => {
        res.status(200).send({id : 1 , book : 'Harry Potter P1'});
    })
    /*
         POST '/books/ -> Inserts the given new book data in the Database
    */
    .post((req , res) => {
        const newBook = {
            id: 2,
            book : req.body.name
        };

        res.status(200).send(newBook);
    });


router
    .route('/books/:id')
    /*
         PUT '/books/id -> Updates the book record of the given id
    */
    .put((req , res) => {
        const id = req.params.id;
        const newData = req.body;

        res.status(200).send(`Data updated for id : ${id}`);
    })
    /*
         DELETE '/books/id -> Deletes the book record for given id
    */
   .delete((req , res) => {
        const id = req.params.id;

        res.status(200).send(`Data deleted. id : ${id}`)
   })


module.exports = router;
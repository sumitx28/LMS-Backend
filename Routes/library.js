const express = require('express');
const router = express.Router();
const db = require('../models/index');
const BooksModel = db.books;

router
    .route('/books')
    /*
         GET '/books' -> fetch and returns all book records from the Database
    */
    .get((req , res) => {
        BooksModel.findAll({})
        .then(data => res.status(200).send(data))
        .catch((err) => res.send(400).send(err));
    })
    /*
         POST '/books/ -> Inserts the given new book data in the Database
    */
    .post((req , res) => {
        BooksModel.create(req.body)
        .then(() => res.status(201).send('Record Created'))
        .catch((err) => res.status(400).send(err));
    });


router
    .route('/books/:id')
    /*
         PUT '/books/id -> Updates the book record of the given id
    */
    .put((req , res) => {
        BooksModel.update(req.body , {where : {id : req.params.id}})
        .then(() => res.status(200).send('Record Updated'))
        .catch(err => res.status(400).send(err));
    })
    /*
         DELETE '/books/id -> Deletes the book record for given id
    */
   .delete((req , res) => {
        BooksModel.destroy({where : {id : req.params.id}})
        .then(() => res.status(200).send('Record Deleted'))
        .catch(err => res.status(400).send(err));
   })


module.exports = router;
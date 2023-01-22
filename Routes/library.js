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
        .then(() => res.status(200).send(JSON.stringify('record created')))
        .catch((err) => res.status(400).send(err));
    });


router
    .route('/books/:id')
    /*
         GET '/books/id -> Find book for the given id
    */
    .get((req , res) => {
        BooksModel.findOne({where : {id : req.params.id}})
        .then(data => res.status(200).send(data))
        .catch(err => res.status(400).send(err));
    })
    /*
         PUT '/books/id -> Updates the book record of the given id
    */
    .put((req , res) => {
        BooksModel.update(req.body , {where : {id : req.params.id}})
        .then(() => res.status(200).send(JSON.stringify('Record Updated')))
        .catch(err => res.status(400).send(err));
    })
    /*
         DELETE '/books/id -> Deletes the book record for given id
    */
   .delete((req , res) => {
        BooksModel.destroy({where : {id : req.params.id}})
        .then(() => res.status(200).send(JSON.stringify('Record Deleted')))
        .catch(err => res.status(400).send(err));
   })


module.exports = router;
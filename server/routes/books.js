/* 
File name      : books.js
Student’s Name : Asmae Allou  
StudentID      : 301159608
Date           : 1-11-2021
*/

// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// define the book model
let book = require('../models/books');

/* GET books List page. READ */
router.get('/', (req, res, next) => {
  // find all books in the books collection
  book.find( (err, books) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('books/index', {
        title: 'Books',
        books: books
      });
    }
  });

});

//  GET the Book Details page in order to add a new Book
router.get('/add', (req, res, next) => {

  /*****************
   * ADD CODE HERE *
   *****************/

  res.render('books/details', {title:"Add Book", books: ''});

});

// POST process the Book Details page and create a new Book - CREATE
router.post('/add', (req, res, next) => {

  /*****************
   * ADD CODE HERE *
   *****************/

  //instantiating a new book object
  let newBook = book({
    "Title": req.body.title,
    "Description": req.body.description,
    "Price": req.body.price,
    "Author": req.body.author,
    "Genre": req.body.genre
  });

  //using the new book object to create a new record then redirecting to books page
  book.create(newBook, (err, book)=>{
    if(err){
      console.log(err);
      res.end(err);
    }
    else{
      res.redirect('/books');
    }

  });
});

// GET the Book Details page in order to edit an existing Book
router.get('/:id', (req, res, next) => {

  /*****************
   * ADD CODE HERE *
   *****************/

  let id = req.params.id;

  //using the id to find the book we need to edit then rendering the edit page
  book.findById({_id: id}, (err, bookToEdit)=>{

    if(err){
      console.log(err);
      res.end(err);
    }
    else{
      res.render('books/details', {title:"Edit Book", books: bookToEdit});
    }

  });

});

// POST - process the information passed from the details form and update the document
router.post('/:id', (req, res, next) => {

  /*****************
   * ADD CODE HERE *
   *****************/

  let id = req.params.id;

  //creating a new book object
  let editedBook = book({
    "_id": id,
    "Title": req.body.title,
    "Description": req.body.description,
    "Price": req.body.price,
    "Author": req.body.author,
    "Genre": req.body.genre

  });

  //updating the old record with the new one then redirecting to books page
  book.updateOne({_id: id}, editedBook, (err)=>{

    if(err){
      console.log(err);
      res.end(err);
    }
    else{
      res.redirect('/books');
    }
  });

});

// GET - process the delete by user id
router.get('/delete/:id', (req, res, next) => {

  /*****************
   * ADD CODE HERE *
   *****************/

  let id = req.params.id;

  //using the id to delete a book, then redirecting to books page
  book.remove({_id:id}, (err)=>{
    
    if(err){
      console.log(err);
      res.end(err);
    }
    else{
      res.redirect('/books');
    }
  });

});


module.exports = router;

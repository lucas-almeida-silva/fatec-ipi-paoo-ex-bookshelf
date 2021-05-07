const { Router } = require('express');
const Book = require('../models/Book');

const booksRouter = Router();

booksRouter.get('/', (req, res) => {
  Book.find().then(books => {
    res.json(books);
  });
});

booksRouter.post('/', (req, res) => {
  const { title, author, totalPages } = req.body;

  const book = new Book({
    title,
    author,
    totalPages
  });

  book.save().then(createdBook => {
    res.status(201).send({ id: createdBook._id });
  });
});

booksRouter.delete('/:id', (req, res) => {
  const id = req.params.id;

  Book.deleteOne({_id: id}).then(() => {
    res.status(204).send();
  });
});

module.exports = booksRouter;

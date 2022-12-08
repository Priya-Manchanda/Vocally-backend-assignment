const mongoose = require("mongoose");
const express = require("express");
const books = require("../models/Booklist");
const router = express.Router();
var fetchBook = require("../middlewares/fetchToken");

//    Get all Books
router.get("/", fetchBook, async (req, res) => {
  const book = await books.find({});
  res.status(200).json(book);
});

//    Get Single Book
router.get("/:id", fetchBook, async (req, res) => {
  const id = req.params.id;
  const book = await books.findById({ _id: id });
  res.status(200).json(book);
});

//      Post A Book
router.post("/", fetchBook, async (req, res) => {
  const book = req.body;
  await books.create(book);
  const data = {
    book: {
      id: book.id,
    },
  };
  res.status(200).send(`Book with ${book.title} created`);
});

//      Delete a Book
router.delete("/:id", fetchBook, async (req, res) => {
  const id = req.params.id;
  const book = await books.findByIdAndDelete({ _id: id });
  res.status(200).json({ msg: "Book deleted Succesfully" });
});

//      Update a Book
router.put("/:id", fetchBook, async (req, res) => {
  const id = req.params.id;
  const { title, author, publication, year } = req.body;
  const book = await books.findOneAndUpdate(
    { _id: id },
    {
      title,
      author,
      publication,
      year,
    }
  );
  res.status(200).json({ msg: "Book updated succesfully" });
});
module.exports = router;

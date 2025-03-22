// backend/routes/books.js
const express = require('express');
const router = express.Router();
const Book = require('../models/Book');

// GET /api/books?branch=Central&page=1&limit=10
router.get('/', async (req, res) => {
  try {
    const { branch, status, page = 1, limit = 10 } = req.query;
    const query = {};

    if (branch) query.branch = branch;
    if (status) query.status = status;

    const totalBooks = await Book.countDocuments(query);
    const totalPages = Math.ceil(totalBooks / limit);

    const books = await Book.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    res.json({
      success: true,
      data: books,
      page: Number(page),
      totalPages,
      totalBooks,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching books',
      error: error.message,
    });
  }
});

// GET /api/books/branches - Get distinct branches
router.get('/branches', async (req, res) => {
  try {
    const branches = await Book.distinct('branch');
    res.json({ success: true, data: branches });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching branches',
      error: error.message,
    });
  }
});

// POST /api/books/:branch - Add a new book
router.post('/:branch', async (req, res) => {
  try {
    const { branch } = req.params;
    const { title, author, isbn } = req.body;

    if (!title) {
      return res
        .status(400)
        .json({ success: false, message: 'Title is required' });
    }

    const book = new Book({ title, author, isbn, branch, status: 'Available' });
    await book.save();

    res.status(201).json({ success: true, data: book });
  } catch (error) {
    if (error.code === 11000) {
      return res
        .status(400)
        .json({ success: false, message: 'Duplicate ISBN error' });
    }

    res.status(500).json({
      success: false,
      message: 'Error adding book',
      error: error.message,
    });
  }
});

// DELETE /api/books/:branch/:bookId - Delete a book
router.delete('/:branch/:bookId', async (req, res) => {
  try {
    const { branch, bookId } = req.params;

    const book = await Book.findOneAndDelete({ _id: bookId, branch });

    if (!book) {
      return res
        .status(404)
        .json({ success: false, message: 'Book not found' });
    }

    res.json({
      success: true,
      message: 'Book deleted successfully',
      data: book,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting book',
      error: error.message,
    });
  }
});

module.exports = router;
// backend/routes/transactions.js
const express = require('express');
const router = express.Router();
const Book = require('../models/Book');
const Transaction = require('../models/Transaction');

// Helper function for late fee calculation
const calculateLateFee = (dueDate, returnDate) => {
  const msPerDay = 24 * 60 * 60 * 1000;
  const daysLate = Math.floor((returnDate - dueDate) / msPerDay);
  if (daysLate > 3) {
    return (daysLate - 3) * 5; // ₹5 per day after 3-day grace period
  }
  return 0;
};

// POST /api/transactions/borrow - Borrow a book
router.post('/borrow', async (req, res) => {
  try {
    const { bookId, memberId, issueDate, dueDate } = req.body;
    if (!bookId || !memberId || !issueDate || !dueDate) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }
    // Check if book exists and is available
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ success: false, message: 'Book not found' });
    }
    if (book.status !== 'Available') {
      return res.status(400).json({ success: false, message: 'Book not available for borrowing' });
    }
    // Update book status
    book.status = 'Borrowed';
    await book.save();

    // Create transaction record
    const transaction = new Transaction({
      book: bookId,
      member: memberId,
      issueDate: new Date(issueDate),
      dueDate: new Date(dueDate)
    });
    await transaction.save();

    res.status(201).json({ success: true, message: 'Book borrowed successfully', data: transaction });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error borrowing book', error: error.message });
  }
});

// POST /api/transactions/return - Return a book
router.post('/return', async (req, res) => {
  try {
    const { transactionId, returnDate } = req.body;
    if (!transactionId || !returnDate) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }
    const transaction = await Transaction.findById(transactionId).populate('book');
    if (!transaction) {
      return res.status(404).json({ success: false, message: 'Transaction not found' });
    }
    if (transaction.returnDate) {
      return res.status(400).json({ success: false, message: 'Book already returned' });
    }
    transaction.returnDate = new Date(returnDate);
    transaction.lateFee = calculateLateFee(transaction.dueDate, transaction.returnDate);
    await transaction.save();

    // Update book status back to Available
    const book = await Book.findById(transaction.book._id);
    if (book) {
      book.status = 'Available';
      await book.save();
    }

    res.json({ success: true, message: 'Book returned successfully', data: transaction });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error returning book', error: error.message });
  }
});

// GET /api/transactions/reports/lateFees - Get late fee report
router.get('/reports/lateFees', async (req, res) => {
  try {
    const transactions = await Transaction.find({ lateFee: { $gt: 0 } })
      .populate('book')
      .populate('member');
    res.json({ success: true, data: transactions });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error generating late fee report', error: error.message });
  }
});

// GET /api/transactions/reports/history - Get borrowing history
router.get('/reports/history', async (req, res) => {
  try {
    const transactions = await Transaction.find()
      .populate('book')
      .populate('member');
    res.json({ success: true, data: transactions });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching borrowing history', error: error.message });
  }
});

// GET /api/transactions/overdue - Get overdue transactions
router.get('/overdue', async (req, res) => {
  try {
    const today = new Date();
    const overdueTransactions = await Transaction.find({
      dueDate: { $lt: today },
      returnDate: { $exists: false }
    })
      .populate('book')
      .populate('member');
    res.json({ success: true, data: overdueTransactions });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching overdue transactions', error: error.message });
  }
});

module.exports = router;
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // ✅ Import cors

// Import routes
const booksRoute = require('./routes/books');
const transactionsRoute = require('./routes/transactions');
const usersRoute = require('./routes/users');

const app = express();

// ✅ Enable CORS before defining routes
app.use(cors());

// Middleware
app.use(bodyParser.json());
app.use(express.json());

// Connect to MongoDB (see config/db.js for connection logic)
require('./config/db');

// API Routes
app.use('/api/books', booksRoute);
app.use('/api/transactions', transactionsRoute);
app.use('/api/users', usersRoute);

// Handle unmatched routes
app.use((req, res, next) => {
  res.status(404).json({ success: false, message: 'Route Not Found' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Internal Server Error', error: err.message });
});

const PORT = process.env.PORT || 5005; // Optional: use 5005 to match frontend
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
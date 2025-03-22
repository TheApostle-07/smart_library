// backend/config/db.js
const mongoose = require('mongoose');

const mongoURI = process.env.MONGO_URI; // This comes from your .env file

mongoose
  .connect(mongoURI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit process if unable to connect
  });
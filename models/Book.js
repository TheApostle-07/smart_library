const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  author: { type: String, trim: true },
  isbn: { type: String, trim: true, unique: true, sparse: true },
  branch: { type: String, required: true, trim: true },
  status: { type: String, enum: ['Available', 'Borrowed'], default: 'Available' }
}, { timestamps: true });

module.exports = mongoose.model('Book', BookSchema);

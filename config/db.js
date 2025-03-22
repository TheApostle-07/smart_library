const mongoose = require('mongoose');

const mongoURI = process.env.MONGO_URI; 
mongoose
  .connect(mongoURI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1); 
  });

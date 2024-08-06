const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  description: String,
  status: { type: String, enum: ['pending', 'completed'], default: 'pending' },
  createdDate: { type: Date, default: Date.now },
  updatedDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Todo', todoSchema);

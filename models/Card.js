const mongoose = require('mongoose');

const CardSchema = new mongoose.Schema({
  image: String,
  suit: {
    type: String,
    enum: ['HEARTS', 'CLUBS', 'SPADES', 'DIAMONDS'],
  },
  value: {
    type: String,
    enum: ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'],
  },
  code: String,
});

module.exports = mongoose.model('Card', CardSchema);

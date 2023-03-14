const mongoose = require('mongoose');
const validator = require('validator');

const hiddenItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'This "name" field is required'],
    minlength: [2, 'The minimum length of name is 2'],
    maxlength: [30, 'The maximum length of name is 30'],
  },
  desc: {
    type: String,
    required: [true, 'This "desc" field is required'],
    minlength: [2, 'The minimum length of desc is 2'],
  },
  img: {
    type: String,
    required: [true, 'The hidden item must contain image URL'],
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'Wrong image URL format',
    },
  },
  owner: {
    type: mongoose.Types.ObjectId,
    required: [true, 'The hiddenItem must contain owner id for save'],
    ref: 'user',
    select: false,
  },
});

module.exports = mongoose.model('hiddenItem', hiddenItemSchema);

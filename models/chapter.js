const mongoose = require('mongoose');
const validator = require('validator');

const chapterSchema = new mongoose.Schema({
  no: {
    type: Number,
    required: [true, 'The "no" field must be filled in'],
  },
  name: {
    type: String,
    required: [true, 'The "name" field must be filled in'],
  },
  thumbNail: {
    type: String,
    required: [true, 'The article must contain image URL'],
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'Wrong image URL format',
    },
  },
  owner: {
    type: mongoose.Types.ObjectId,
    required: [true, 'The chapter must contain owner id for save'],
    ref: 'user',
    select: false,
  },
});

module.exports = mongoose.model('chapter', chapterSchema);

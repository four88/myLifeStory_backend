const mongoose = require('mongoose');
const validator = require('validator');

const chapterSchema = new mongoose.Schema({
  no: {
    type: Number,
    required: [true, 'The "no" field in page section must be filled in'],
  },
  pageImg: {
    type: String,
    required: [true, 'The article must contain image URL'],
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'Wrong image URL format',
    },
  },
  story: {
    type: String,
  },
  chapter: {
    type: mongoose.Types.ObjectId,
    required: [true, 'The chapter must contain owner id for save'],
    ref: 'chapter',
    select: false,
  },
});

module.exports = mongoose.model('chapter', chapterSchema);

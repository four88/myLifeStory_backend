const mongoose = require('mongoose');

const chapterSchema = new mongoose.Schema({
  no: {
    type: Number,
    required: [true, 'The "no" field must filled in'],
  },
  name: {
    type: String,
    required: [true, 'The "name" field must filled in'],
  },
  thumbNail: {
    data: Buffer,
    contentType: 'image/jpeg' || 'image/png',
  },
  page: [{
    no: {
      type: Number,
      required: [true, 'The "no" field in page section must filled in'],
    },
    pageImg: {
      data: Buffer,
      contentType: 'image/jpeg' || 'image/png',
    },
    story: {
      type: String,
    },
  }],
  owner: {
    type: mongoose.Types.ObjectId,
    required: [true, 'The chapter must contain owener id for save'],
    ref: 'user',
    select: false,
  },

});

module.exports = mongoose.model('chapter', chapterSchema);

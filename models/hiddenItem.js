const mongoose = require('mongoose');

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
    data: Buffer,
    contentType: {
      type: String,
      required: true,
    },
  },
  owner: {
    type: mongoose.Types.ObjectId,
    required: [true, 'The hiddenItem must contain owner id for save'],
    ref: 'user',
    select: false,
  },
});

module.export = mongoose.model('hiddenItem', hiddenItemSchema);

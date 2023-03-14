const mongoose = require('mongoose');

const avatarSchema = mongoose.Schema({
  gender: {
    type: String,
    enum: ['male', 'female'],
    required: [true, 'This "gender" field must fill in'],
  },
  hair: {
    type: String,
    required: [true, 'This "hair" field must fill in'],
  },
  skin: {
    type: String,
    required: [true, 'This "skin" filed must fill in'],
  },
  top: {
    type: String,
    required: [true, 'This "top" filed must fill in'],
  },
  bottom: {
    type: String,
    required: [true, 'This "bottom" filed must fill in'],
  },
  owner: {
    type: mongoose.Types.ObjectId,
    required: [true, 'The hiddenItem must contain owner id for save'],
    ref: 'user',
    select: false,
  },
});

module.exports = mongoose.model('avatar', avatarSchema);

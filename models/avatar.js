const mongoose = require('mongoose');

const avatarSchema = mongoose.Schema({
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

module.export = mongoose.model('avatar', avatarSchema);

const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  img: {
    type: String,
    required: [true, 'The article must contain image URL'],
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'Wrong image URL format',
    },
  },

  email: {
    type: String,
    unique: [true, 'This email is already used'],
    required: [true, 'The email must filled in'],
    validate: {
      validator: (v) => validator.isEmail(v),
      message: 'Wrong email format',
    },
  },

  password: {
    type: String,
    required: [true, 'This password must be filled in'],
    select: false,
  },

  firstname: {
    type: String,
    required: [true, 'The "firstname" field must be filled in'],
    minlength: [2, 'The minimum length of name is 2'],
    maxlength: [30, 'The maximum length of name is 30'],
  },

  surname: {
    type: String,
    required: [true, 'The "firstname" field must be filled in'],
    minlength: [2, 'The minimum length of name is 2'],
    maxlength: [30, 'The maximum length of name is 30'],
  },

  name: {
    type: String,
    required: [true, 'The "name" field must be filled in'],
    minlength: [2, 'The minimum length of name is 2'],
    maxlength: [30, 'The maximum length of name is 30'],
  },

  age: {
    type: Number,
    required: [true, 'The "age" field must be filled in'],
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
    required: [true, 'The "role" field must filled in'],
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Incorrect password or email'));
      }

      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return Promise.reject(new Error('Incorrect password or email'));
        }
        return user;
      });
    });
};

module.exports = mongoose.model('user', userSchema);

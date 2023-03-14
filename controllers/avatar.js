const mongoose = require('mongoose');
const Avatar = require('../models/avatar');

const NotFoundError = require('../errors/notFoundError');
const BadRequestError = require('../errors/badRequestError');
const { SUCCESS_CODE } = require('../utils/constant');

// create avatar
// eslint-disable-next-line
module.exports.createAvatar = (req, res, next) => {
  const {
    gender, hair, skin, top, bottom, owner,
  } = req.body;
  Avatar.create({
    gender,
    hair,
    skin,
    top,
    bottom,
    owner,
  })
    .then((avatar) => res.status(SUCCESS_CODE).send({ data: avatar }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Invalid input of avatar'));
      } else {
        // eslint-disable-next-line
        next(err);
      }
    });
};

// get chapter
// eslint-disable-next-line
module.exports.getUserAvatar = (req,res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.userId)) {
    throw new NotFoundError('Not found this user Id');
  }

  Avatar.find({ owner: req.params.userId }).select('+owner')
    .then((avatar) => {
      res.status(SUCCESS_CODE).send({ data: avatar });
    })
    .catch(next);
};

// edit chapter
// eslint-disable-next-line
module.exports.editAvatar = (req, res, next) => {
  const {
    gender,
    hair,
    skin,
    top,
    bottom,
  } = req.body;

  const id = req.params.avatarId;

  Avatar.findByIdAndUpdate(id, {
    gender, hair, skin, top, bottom,
  }, { runValidators: true, new: true })
    .orFail(() => {
      const error = new Error('Can not find this avatar id');
      error.statusCode = 404;
      throw error;
    })
    .then((avatar) => res.status(SUCCESS_CODE).send({ data: avatar }))
    .catch((err) => {
      if (err.name === 'CastError') {
        // eslint-disable-next-line
        next(new BadRequestError('Invalid user ID'));
      } else if (err.name === 'ValidationError') {
        // eslint-disable-next-line
        next(new BadRequestError('Invalid name or description'));
      } else {
        // eslint-disable-next-line
        next(err);
      }
    });
};

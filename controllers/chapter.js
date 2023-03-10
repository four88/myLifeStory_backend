const mongoose = require('mongoose');
const Chapter = require('../models/chapter');

const NotFoundError = require('../errors/notFoundError');
const BadRequestError = require('../errors/badRequestError');
const { SUCCESS_CODE } = require('../utils/constant');

// create chapter
// eslint-disable-next-line
module.exports.createChapter = (req, res, next) => {
  const {
    no, name, thumbNail, owner,
  } = req.body;
  Chapter.create({
    no,
    name,
    thumbNail,
    owner,
  })
    .then((chapter) => res.status(SUCCESS_CODE).send({ data: chapter }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Invalid input of article'));
      } else {
        // eslint-disable-next-line
        next(err);
      }
    });
};

// get chapter
// eslint-disable-next-line
module.exports.getUserChapter = (req,res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.userId)) {
    throw new NotFoundError('Not found this user Id');
  }

  Chapter.find({ owner: req.params.userId }).select('+owner')
    .then((chapter) => {
      res.status(SUCCESS_CODE).send({ data: chapter });
    })
    .catch(next);
};

// delete chapter
// eslint-disable-next-line
module.exports.deleteChapter = (req, res, next) => {
  const id = req.params.chapterId;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new NotFoundError('Not found this chapter id');
  }
  Chapter.findByIdAndRemove(id)
    .then((chapter) => {
      res.status(SUCCESS_CODE).send({ data: chapter });
    })
    .catch(next);
};

// edit chapter
// eslint-disable-next-line
module.exports.editChapter = (req, res, next) => {
  const {
    no,
    name,
    thumbNail,
  } = req.body;

  const id = req.params.chapterId;

  Chapter.findByIdAndUpdate(id, { no, name, thumbNail }, { runValidators: true, new: true })
    .orFail(() => {
      const error = new Error('Can not find this specific id');
      error.statusCode = 404;
      throw error;
    })
    .then((chapter) => res.status(SUCCESS_CODE).send({ data: chapter }))
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

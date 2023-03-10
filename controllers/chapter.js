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
  if (!mongoose.Types.ObjectId.isValid(req.user._id)) {
    throw new NotFoundError('Not found this user Id');
  }

  Chapter.find({ owner: req.user._id }).select('+owner')
    .then((chapter) => {
      res.status(SUCCESS_CODE).send({ data: chapter });
    })
    .catch(next);
};

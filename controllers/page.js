const mongoose = require('mongoose');
const Page = require('../models/page');

const NotFoundError = require('../errors/notFoundError');
const BadRequestError = require('../errors/badRequestError');
const { SUCCESS_CODE } = require('../utils/constant');

// create page
// eslint-disable-next-line
module.exports.createPage = (req, res, next) => {
  const {
    no,
    pageImg,
    story,
    chapter,
  } = req.body;

  Page.create({
    no,
    pageImg,
    story,
    chapter,
  })
    .then((page) => res.status(SUCCESS_CODE).send({ data: page }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Invalid input of page'));
      } else {
        // eslint-disable-next-line
        next(err);
      }
    });
};

// get page from chapterId
// eslint-disable-next-line
module.exports.getPage = (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.chapterId)) {
    throw new NotFoundError('Not found this chapter Id');
  }

  Page.find({ chapter: req.params.chapterId }).select('+chapter')
    .then((page) => {
      res.status(SUCCESS_CODE).send({ data: page });
    })
    .catch(next);
};

// delete chapter
// eslint-disable-next-line
module.exports.deletePage = (req, res, next) => {
  const id = req.params.pageId;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new NotFoundError('Not found this page id');
  }
  Page.findByIdAndRemove(id)
    .then((page) => {
      res.status(SUCCESS_CODE).send({ data: page });
    })
    .catch(next);
};

// edit chapter
// eslint-disable-next-line
module.exports.editPage = (req, res, next) => {
  const {
    no,
    pageImg,
    story,
  } = req.body;

  const id = req.params.pageId;

  Page.findByIdAndUpdate(id, { no, pageImg, story }, { runValidators: true, new: true })
    .orFail(() => {
      const error = new Error('Can not find this specific id');
      error.statusCode = 404;
      throw error;
    })
    .then((page) => res.status(SUCCESS_CODE).send({ data: page }))
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

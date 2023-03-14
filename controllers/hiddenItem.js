const mongoose = require('mongoose');
const HiddenItem = require('../models/hiddenItem');

const NotFoundError = require('../errors/notFoundError');
const BadRequestError = require('../errors/badRequestError');
const { SUCCESS_CODE } = require('../utils/constant');

// create hiddenItem
// eslint-disable-next-line
module.exports.createHiddenItem = (req, res, next) => {
  const {
    name, desc, owner, img,
  } = req.body;

  HiddenItem.create({
    name,
    img,
    owner,
    desc,
  })
    .then((hiddenItem) => res.status(SUCCESS_CODE).send({ data: hiddenItem }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Invalid input of hidden item'));
      } else {
        // eslint-disable-next-line
        next(err);
      }
    });
};

// get hiddenItem
// eslint-disable-next-line
module.exports.getHiddenItem = (req,res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.userId)) {
    throw new NotFoundError('Not found this user Id');
  }

  HiddenItem.find({ owner: req.params.userId }).select('+owner')
    .then((hiddenItem) => {
      res.status(SUCCESS_CODE).send({ data: hiddenItem });
    })
    .catch(next);
};

// delete hiddenItem
// eslint-disable-next-line
module.exports.deleteHiddenItem = (req, res, next) => {
  const id = req.params.hiddenItemId;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new NotFoundError('Not found this hidden item id');
  }
  HiddenItem.findByIdAndRemove(id)
    .then((hiddenItem) => {
      res.status(SUCCESS_CODE).send({ data: hiddenItem });
    })
    .catch(next);
};

// edit hiddenItem
// eslint-disable-next-line
module.exports.editHiddenItem = (req, res, next) => {
  const {
    name,
    img,
    desc,
  } = req.body;

  const id = req.params.hiddenItemId;

  HiddenItem.findByIdAndUpdate(id, { desc, name, img }, { runValidators: true, new: true })
    .orFail(() => {
      const error = new Error('Can not find this hidden id');
      error.statusCode = 404;
      throw error;
    })
    .then((hiddenItem) => res.status(SUCCESS_CODE).send({ data: hiddenItem }))
    .catch((err) => {
      if (err.name === 'CastError') {
        // eslint-disable-next-line
        next(new BadRequestError('Invalid hidden item ID'));
      } else if (err.name === 'ValidationError') {
        // eslint-disable-next-line
        next(new BadRequestError('Invalid name , desc or img'));
      } else {
        // eslint-disable-next-line
        next(err);
      }
    });
};

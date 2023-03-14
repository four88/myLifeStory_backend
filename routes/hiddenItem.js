const router = require('express').Router();

const { celebrate, Joi } = require('celebrate');

const {
  createHiddenItem,
  getHiddenItem,
  deleteHiddenItem,
  editHiddenItem,
} = require('../controllers/hiddenItem');

router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    // eslint-disable-next-line
    img: Joi.string().required().pattern(new RegExp(/^(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/)),
    desc: Joi.string().required().min(2),
    owner: Joi.string().required().hex(),
  }),
}), createHiddenItem);

router.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().hex(),
  }),
}), getHiddenItem);

router.delete('/:hiddenItemId', celebrate({
  params: Joi.object().keys({
    hiddenItemId: Joi.string().required().hex(),
  }),
}), deleteHiddenItem);

router.patch('/:hiddenItemId', celebrate({
  params: Joi.object().keys({
    hiddenItemId: Joi.string().required().hex(),
  }),
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    // eslint-disable-next-line
    img: Joi.string().pattern(new RegExp(/^(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/)),
    desc: Joi.string().min(2),
  }),
}), editHiddenItem);

module.exports = router;

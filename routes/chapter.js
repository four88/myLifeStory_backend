const router = require('express').Router();

const { celebrate, Joi } = require('celebrate');

const { createChapter, getUserChapter } = require('../controllers/chapter');

router.post('/', celebrate({
  body: Joi.object().keys({
    no: Joi.number().required(),
    name: Joi.string().min(2).max(30).required(),
    // eslint-disable-next-line
    thumbNail: Joi.string().required().pattern(new RegExp(/^(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/)),
    owner: Joi.string().required(),
  }),
}), createChapter);

router.get('/', getUserChapter);

module.exports = router;

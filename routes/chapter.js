const router = require('express').Router();

const { celebrate, Joi } = require('celebrate');

const { createChapter, getUserChapter, deleteChapter, editChapter } = require('../controllers/chapter');

router.post('/', celebrate({
  body: Joi.object().keys({
    no: Joi.number().required(),
    name: Joi.string().min(2).max(30).required(),
    // eslint-disable-next-line
    thumbNail: Joi.string().required().pattern(new RegExp(/^(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/)),
    owner: Joi.string().required(),
  }),
}), createChapter);

router.get('/:userId', getUserChapter);

router.delete('/:chapterId', celebrate({
  params: Joi.object().keys({
    chapterId: Joi.string().required().hex(),
  }),
}), deleteChapter);

router.patch('/:chapterId', celebrate({
  params: Joi.object().keys({
    chapterId: Joi.string().required().hex(),
  }),
  body: Joi.object().keys({
    no: Joi.number().required(),
    name: Joi.string().min(2).max(30).required(),
    // eslint-disable-next-line
    thumbNail: Joi.string().required().pattern(new RegExp(/^(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/)),
  }),
}), editChapter);

module.exports = router;

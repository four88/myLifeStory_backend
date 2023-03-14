const router = require('express').Router();

const { celebrate, Joi } = require('celebrate');
const { createAvatar, getUserAvatar, editAvatar } = require('../controllers/avatar');

const hexColorRegex = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;

router.post('/', celebrate({
  body: Joi.object().keys({
    gender: Joi.string().required().min(2).max(6),
    hair: Joi.string().required().pattern(hexColorRegex),
    skin: Joi.string().required().pattern(hexColorRegex),
    top: Joi.string().required().pattern(hexColorRegex),
    bottom: Joi.string().required().pattern(hexColorRegex),
    owner: Joi.string().required().hex(),
  }),
}), createAvatar);

router.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().hex(),
  }),
}), getUserAvatar);

router.patch('/:avatarId', celebrate({
  params: Joi.object().keys({
    avatarId: Joi.string().required().hex(),
  }),
  body: Joi.object().keys({
    gender: Joi.string().required().min(2).max(6),
    hair: Joi.string().required().pattern(hexColorRegex),
    skin: Joi.string().required().pattern(hexColorRegex),
    top: Joi.string().required().pattern(hexColorRegex),
    bottom: Joi.string().required().pattern(hexColorRegex),
  }),
}), editAvatar);

module.exports = router;

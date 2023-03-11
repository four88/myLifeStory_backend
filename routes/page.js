const router = require('express').Router();

const { celebrate, Joi } = require('celebrate');

const {
  createPage,
  getPage,
  deletePage,
  editPage,
} = require('../controllers/page');

// create page route
router.post('/', celebrate({
  body: Joi.object().keys({
    no: Joi.number().required(),
    // eslint-disable-next-line
    pageImg: Joi.string().required().pattern(new RegExp(/^(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/)),
    story: Joi.string().required(),
    chapter: Joi.string().required().hex(),
  }),
}), createPage);

// get page from chapterId
router.get('/:chapterId', celebrate({
  params: Joi.object().keys({
    chapterId: Joi.string().required().hex(),
  }),
}), getPage);

// delete page route
router.delete('/:pageId', celebrate({
  params: Joi.object().keys({
    pageId: Joi.string().required().hex(),
  }),
}), deletePage);

// edit page route
router.patch('/:pageId', celebrate({
  params: Joi.object().keys({
    pageId: Joi.string().required().hex(),
  }),
  body: Joi.object().keys({
    no: Joi.number().required(),
    story: Joi.string().min(2).required(),
    // eslint-disable-next-line
    pageImg: Joi.string().required().pattern(new RegExp(/^(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/)),
  }),
}), editPage);

module.exports = router;

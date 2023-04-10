const router = require('express').Router();

const { celebrate, Joi } = require('celebrate');
const { getUserInfo, deleteUser } = require('../controllers/user');

// assign routes
// get info user
router.get('/me', getUserInfo);
router.delete(
  '/:userId',
  celebrate({
    params: Joi.object().keys({
      userId: Joi.string().required().hex(),
    }),
  }),
  deleteUser,
);

module.exports = router;

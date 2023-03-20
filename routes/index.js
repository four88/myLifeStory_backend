const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  registerUser,
  loginUser,
  loginAdmin,
  getAllUser,
} = require('../controllers/user');
const userRoutes = require('./user');
const chapterRoutes = require('./chapter');
const pageRoutes = require('./page');
const hiddenItemRoutes = require('./hiddenItem');
const avatarRoutes = require('./avatar');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/notFoundError');

// routes for register, login-user, login-admin
// register
router.post(
  '/register',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      firstname: Joi.string().min(2).max(30).required(),
      surname: Joi.string().min(2).max(30).required(),
      name: Joi.string().min(2).max(30).required(),
      password: Joi.string().required(),
      age: Joi.number().required(),
      role: Joi.string().required(),
      img: Joi.string()
        .required()
        .pattern(
          // eslint-disable-next-line
          new RegExp(
            // eslint-disable-next-line
            /^(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/
          ),
        ),
    }),
  }),
  registerUser,
);

// auth middleware have to apply here
router.post('/login-user', loginUser);
router.post('/login-admin', loginAdmin);

router.use(auth);

router.post('/register', registerUser);

router.get('/showusers', getAllUser);
// user route
router.use('/user', userRoutes);

// chapter route
router.use('/chapter', chapterRoutes);

// page route
router.use('/page', pageRoutes);

// hiddenItem route
router.use('/hidden-item', hiddenItemRoutes);

// avatar route
router.use('/avatar', avatarRoutes);

// for random route not includes in this project
router.get('*', () => {
  throw new NotFoundError('Request resource not found');
});

module.exports = { router };

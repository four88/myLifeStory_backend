const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { registerUser, loginUser, loginAdmin, getAllUser } = require('../controllers/user');
const userRoutes = require('./user');
const chapterRoutes = require('./chapter');
const pageRoutes = require('./page');
// const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/notFoundError');

// routes for register, login-user, login-admin
// register
router.post('/register', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    firstname: Joi.string().min(2).max(30).required(),
    surname: Joi.string().min(2).max(30).required(),
    name: Joi.string().min(2).max(30).required(),
    password: Joi.string().required(),
    age: Joi.number().required(),
    role: Joi.string().required(),
  }),
}), registerUser);

// auth middleware have to apply here
router.get('/showusers', getAllUser);
router.get('/login-user', loginUser);
router.get('/login-admin', loginAdmin);

// user route
router.use('/user', userRoutes);

// chapter route
router.use('/chapter', chapterRoutes);

// page route
router.use('/page', pageRoutes);

// for random route not includes in this project
router.get('*', () => {
  throw new NotFoundError('Request resource not found');
});

module.exports = { router };

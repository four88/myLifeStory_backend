const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const { NODE_ENV, JWT_SECRET } = process.env;
const NotFoundError = require("../errors/notFoundError");
const BadRequestError = require("../errors/badRequestError");
const UnauthorizedError = require("../errors/unauthorizedError");
const ConflictError = require("../errors/conflictError");
const { SUCCESS_CODE } = require("../utils/constant");

// get the user data
// eslint-disable-next-line
module.exports.getUserInfo = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => {
      new NotFoundError("User ID not found");
    })
    .then((user) => res.status(SUCCESS_CODE).send({ data: user }))
    .catch(next);
};

// show all user
// eslint-disable-next-line
module.exports.getAllUser = (req, res, next) => {
  User.find({ role: "user" })
    .orFail(() => {
      new NotFoundError("Cannot found any user");
    })
    .then((users) => res.status(SUCCESS_CODE).send({ data: users }))
    .catch(next);
};

// register user
// eslint-disable-next-line
module.exports.registerUser = (req, res, next) => {
  const { email, password, firstname, surname, name, age, role, img } =
    req.body;
  bcrypt.hash(password, 10).then((hash) => {
    User.create({
      img,
      email,
      firstname,
      surname,
      name,
      age,
      role,
      password: hash,
    })
      .then((user) =>
        res.status(SUCCESS_CODE).send({
          data: {
            _id: user._id,
            name: user.name,
            img: user.img,
            role: user.role,
          },
        })
      )
      .catch((err) => {
        if (err.name === "ValidationError") {
          // eslint-disable-next-line
          next(new BadRequestError("Missing or Invalid email or password"));
        }
        if (err.name === "MongoServerError") {
          // eslint-disable-next-line
          next(new ConflictError("This email is already exits"));
        } else {
          // eslint-disable-next-line
          next(err);
        }
      });
  });
};

// login for user
// eslint-disable-next-line
module.exports.loginUser = (req, res, next) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      if (user.role === "user") {
        res.status(SUCCESS_CODE).send({
          token: jwt.sign(
            { _id: user._id },
            NODE_ENV === "production" ? JWT_SECRET : "dev-secret",
            { expiresIn: "7d" }
          ),
          _id: user._id,
          name: user.name,
          email: user.email,
          firstname: user.firstname,
          surname: user.surname,
          img: user.img,
        });
      } else {
        next(new UnauthorizedError("This account is not admin"));
      }
    })
    .catch(() => {
      // eslint-disable-next-line
      next(new UnauthorizedError("Incorrect email or password"));
    });
};

// login for admin
// eslint-disable-next-line
module.exports.loginAdmin = (req, res, next) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      if (user.role === "admin") {
        res.status(SUCCESS_CODE).send({
          token: jwt.sign(
            { _id: user._id },
            NODE_ENV === "production" ? JWT_SECRET : "dev-secret",
            { expiresIn: "7d" }
          ),
          name: user.name,
          email: user.email,
          firstname: user.firstname,
          surname: user.surname,
          img: user.img,
        });
      } else {
        next(new UnauthorizedError("This account is not admin"));
      }
    })
    .catch(() => {
      // eslint-disable-next-line
      next(new UnauthorizedError("Incorrect email or password"));
    });
};

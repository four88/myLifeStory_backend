const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv');
const { errors } = require('celebrate');
const { router } = require('./routes/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;

const { NODE_ENV, DB_URI } = process.env;

const app = express();

dotenv.config();
// set up and connect to DB
const dbUri = 'mongodb://0.0.0.0:27017/myLifeStoryDB';
const dbConfig = {
  useNewUrlParser: true,
};
mongoose.Promise = global.Promise;
// connect DB
mongoose.connect(NODE_ENV === 'production' ? DB_URI : dbUri, dbConfig)
  .then(
    () => {
      console.log('DB connected');
    },
    (err) => {
      console.log(`cannot connect to DB: ${err}`);
    },
  );

// use helment for security
app.use(helmet());

// logger requestLogger
app.use(requestLogger);

// use body-parser for work with http data transfer
// especially json format
app.use(bodyParser.json(), cors());
app.use(bodyParser.urlencoded({
  extended: true,
}));

// middleware for allow a cors
// app.use((req, res, next) => {
//   const { origin } = req.headers; // assign the corresponding header to the origin variable
//
//   if (allowedCors.includes(origin)) { // check that the origin value is among the allowed domains
//     res.header('Access-Control-Allow-Origin', origin);
//   }
//   next();
// });
//
app.use((req, res, next) => {
  req.user = {
    _id: '640b083575b962e4cedfc85c',
  };

  next();
});
app.options('*', cors());

// routes
app.use(router);

// logger
app.use(errorLogger);

app.use(errors());
// for Non-exestent addres// for random route not includes in this project
router.get('*', () => {
  throw new NotFoundError('Request resource not found');
});

app.use((err, req, res, next) => {
  res
    .status(err.statusCode ? err.statusCode : 500)
    .send({
      message: err.message ? err.message : 'An error occurred on the server',
    });
});

// connect port
app.listen(PORT, () => {
  console.log(`Connect to port ${PORT}`);
});

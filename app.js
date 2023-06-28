const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv');
const { errors } = require('celebrate');
const { router } = require('./routes/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { NotFoundError } = require('./utils/constant');

dotenv.config();
const { PORT = 3000 } = process.env;

const { NODE_ENV, DB_URI } = process.env;

const app = express();

const allowedCors = [
  'http://localhost:5173',
  'https://admin.mylifestorybook.tech',
  'https://mylifestorybook.tech',
];
// set up and connect to DB
const dbConfig = {
  useNewUrlParser: true,
};
mongoose.Promise = global.Promise;
// connect DB
mongoose.connect(NODE_ENV === 'production' ? DB_URI : DB_URI, dbConfig).then(
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
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

// middleware for allow a cors
const corsOptions = {
  origin(origin, callback) {
    if (allowedCors.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

app.use(cors(corsOptions));

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
  res.status(err.statusCode ? err.statusCode : 500).send({
    message: err.message ? err.message : 'An error occurred on the server',
  });
});

// connect port
app.listen(PORT, () => {
  console.log(`Connect to port ${PORT}`);
});

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv');
const { errors } = require('celebrate');

const { PORT = 3000 } = process.env;

const { NODE_ENV, DB_URI } = process.env;

const app = express();

dotenv.config();
// set up and connect to DB
const dbUri = 'mongodb://0.0.0.0:27017/newsExplorerDB';
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
//
// use body-parser for work with http data transfer
// especially json format
app.use(bodyParser.json(), cors());
app.use(bodyParser.urlencoded({
  extended: true,
}));

// connect port
app.listen(PORT, () => {
  console.log(`Connect to port ${PORT}`);
});

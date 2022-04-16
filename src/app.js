/**
 * System and 3rd party libs
 */
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

/**
 * Required Services & Helper
 */
const logger = require('./services/logger.service');
const morganLogger = require('./services/morgan.service');

/**
 * Global declarations
 */
const dbURL = process.env.DB_URL || 'mongodb://127.0.0.1:27017/test';

/**
 * Bootstrap App
 */
const app = express();

// CORS
app.use(
  cors({
    origin: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: [
      'Origin',
      ' X-Requested-With',
      ' Content-Type',
      ' Accept ',
      ' Authorization',
    ],
    credentials: true,
  }),
);
app.use(morganLogger);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

/**
 * Import and Register Routes
 */
const index = require('./components');
const { initDatabase } = require('./helper/database.helper');

app.use('/api', index);

/**
 * Catch 404 routes
 */
app.use(function (req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

/**
 * Mongoose Configuration
 */
mongoose.Promise = global.Promise;

mongoose.connection.on('connected', () => {
  logger.info('DATABASE - Connected');
  initDatabase().catch((err) => {
    logger.error(err);
  });
});

mongoose.connection.on('error', (err) => {
  logger.error(`DATABASE - Error:${err}`);
});

mongoose.connection.on('disconnected', () => {
  logger.warn('DATABASE - disconnected  Retrying....');
});

const connectDb = function () {
  const dbOptions = {
    poolSize: 5,
    reconnectTries: Number.MAX_SAFE_INTEGER,
    reconnectInterval: 500,
    useNewUrlParser: true,
  };
  mongoose.connect(dbURL, dbOptions).catch((err) => {
    logger.fatal(`DATABASE - Error:${err}`);
  });
};

connectDb();
module.exports = app;

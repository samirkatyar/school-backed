/**
 * System and 3rd party libs
 */
const morgan = require('morgan');
const logger = require('./logger.service');

/**
 * Declarations & Implementations
 */
const morganInstance = morgan('dev', {
  stream: {
    write: (str) => {
      logger.debug(str);
    },
  },
});

/**
 * Service Export
 */
module.exports = morganInstance;

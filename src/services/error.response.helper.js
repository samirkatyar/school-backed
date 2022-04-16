const log = require('./logger.service');

function generateBadRequest(description, error) {
  return {
    statusCode: 400,
    description,
    error,
    status: 'BAD_REQUEST',
  };
}

function generateNotFound(description) {
  return {
    statusCode: 404,
    description,
    status: 'NOT_FOUND',
  };
}

function generateUnhandledRequest(description, error) {
  log.error(`${description} : ${error}`);
  return {
    statusCode: 500,
    description,
    error,
    status: 'UNHANDLED_ERROR',
  };
}

module.exports = {
  generateBadRequest,
  generateUnhandledRequest,
  generateNotFound,
};

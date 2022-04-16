/**
 * System and 3rd Party libs
 */
const {
  fetchedSuccessfully,
} = require('../../services/success.response.helper');
const {
  generateUnhandledRequest,
} = require('../../services/error.response.helper');
const dbDashboard = require('./dashboard.DAL');

async function getHodDetailsBySubject(req, res) {
  try {
    const { subject } = req.query;

    const result = await dbDashboard.getDetailsBySubject(subject);

    const response = fetchedSuccessfully({
      data: result,
      description: 'Analytics fetched successfully',
    });
    return res.status(response.statusCode).json(response);
  } catch (e) {
    const exception = generateUnhandledRequest('Internal server error', e);
    return res.status(exception.statusCode).json(exception);
  }
}

module.exports = {
  getHodDetailsBySubject,
};

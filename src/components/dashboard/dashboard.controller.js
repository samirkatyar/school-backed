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

/**
 * we have used here in memory map to store the data
 * this is just for demo purpose
 * we can use any other data store like redis, leveldb etc.
 *
 * once we have retrieved the data from the db. we will store it in map.
 * next if request comes for the same data we will fetch it from the map
 *
 * when we add new data into db then we will remove the data from the map
 */
const analyticsMap = {};

async function getHodDetailsBySubject(req, res) {
  try {
    const { subject } = req.query;
    let result;

    if (analyticsMap[subject]) {
      result = analyticsMap[subject];
    } else {
      result = await dbDashboard.getDetailsBySubject(subject);
      analyticsMap[subject] = result;
    }
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

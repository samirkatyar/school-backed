/** * System and 3rd party libs
 */
const express = require('express');
const controller = require('./dashboard.controller');

const router = express.Router();

/**
 * Router Definitions
 */
router.get('/', controller.getHodDetailsBySubject);

/**
 * Export Router
 */
module.exports = router;

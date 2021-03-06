/**
 * System and 3rd party libs
 */
const express = require('express');

const router = express.Router();
const dashboardRoute = require('./dashboard/dashboard.route');

/**
 * Router Definitions
 */
router.use('/dashboard', dashboardRoute);

/**
 * Export Router
 */
module.exports = router;

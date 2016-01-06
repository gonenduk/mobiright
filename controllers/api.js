var express = require('express');
var router = express.Router();
var aggregator = require('../models/aggregator');

/**
 * Aggregator API
 */

router.get('/top', function(req, res, next) {
  aggregator.getTopApps(3, req, function (topApps) {
    res.json(topApps);
  });
});


module.exports = router;

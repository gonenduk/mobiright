var express = require('express');
var router = express.Router();
var aggregator = require('../models/aggregator');

/**
 * Aggregator API
 */

router.get('/top', function(req, res, next) {
  res.render('index', { title: 'Backend Server' });
});


module.exports = router;

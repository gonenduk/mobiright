var express = require('express');
var router = express.Router();


/**
 * Website Pages
 */

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Backend Server' });
});

module.exports = router;

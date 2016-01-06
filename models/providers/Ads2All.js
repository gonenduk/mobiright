var datamgr = require('../datamgr');
var request = require('request');

/**
 * Ads2All object
 */

function Provider(name, settings) {
  this.name = name;
  this.url = settings.url;
  this.key = settings.key;
}

Provider.prototype.getTopApps = function(n, req, callback) {
  // Get top apps from provider
  var uri = this.url + "/api?" + "key=" + this.key + "&realip=" + req.ip;
  request(uri, function (error, res, body) {
    if (err) {
      console.log(err);
      callback([]);
    }

    // Sort

    // Normalize

  });
};


// Export provider constructor
module.exports = Provider;

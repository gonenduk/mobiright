var datamgr = require('../datamgr');
var request = require('request');

/**
 * Ads4You object
 */

function Provider(name, settings) {
  this.name = name;
  this.url = settings.url;
  this.key = settings.key;
  this.map = {
    clickUrl: 'appStoreUrl',
    title: 'name',
    rate: 'rating',
    imageUrl: 'imageUrl'
  };
}

Provider.prototype.getTopApps = function(n, req, callback) {
  // Get top apps from provider
  var uri = this.url + "/api?" + "key=" + this.key + "&realip=" + req.ip;
  request(uri, function (error, res, body) {
    if (err) {
      console.log(err);
      callback([]);
    }

    // Get top n apps
    var topApps = datamgr.getTop(n, 'rating', body);

    // Normalize and return
    callback(datamgr.normalizeArray(this.map, topApps))
  });
};


// Export provider constructor
module.exports = Provider;

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
  var uri = this.url + "/getapps/{" + this.key + "}";
  var formData = {
    ip: req.ip,
    ua: req.userAgent
  };
  request.post(uri, formData, function (error, res, body) {
    if (err) {
      console.log(err);
      callback([]);
    }

    // Concat games and tools
    var topApps = body.games.concat(body.tools);

    // Get top n apps
    topApps = datamgr.getTop(n, 'rate', topApps);

    // Normalize and return
    callback(datamgr.normalizeArray(this.map, topApps))
  });
};


// Export provider constructor
module.exports = Provider;

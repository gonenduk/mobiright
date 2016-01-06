var datamgr = require('../datamgr');
var request = require('request');

/**
 * Ads2All object
 */

function Provider(name, settings) {
  this.name = name;
  this.url = settings.url;
  this.key = settings.key;
  this.map = {
    id: 'appStoreUrl',
    name: 'name',
    rating: 'rating',
    image: 'imageUrl'
  };
}

Provider.prototype.getTopApps = function(n, req, callback) {
  // Get top apps from provider
  var uri = this.url + "/api?" + "key=" + this.key + "&realip=" + req.ip;
  request(uri, afterProvider.bind(this));

  // Callback function after request return
  function afterProvider(err, res, body) {
    // On error log return empty results
    if (err || res.statusCode != 200) {
      console.log("Could not get from Ads2All:");
      console.log(body);
      return callback([]);
    }

    // Convert JSON to array
    var topApps = JSON.parse(body).result;

    // Get top n apps
    topApps = datamgr.getTop(n, 'rating', topApps);

    // Normalize (convert to our property names)
    topApps = datamgr.normalizeArray(this.map, topApps);

    // Replace app id with link to AppStore (Apple or Android)
    topApps.forEach(function (app) {
      var id = app.appStoreUrl;
      if (isNaN(id))
        app.appStoreUrl = "http://play.google.com/store/apps/details?id=" + id;
      else
        app.appStoreUrl = "https://itunes.apple.com/app/id" + id;
    });

    // Return top apps
    callback(topApps);
  }
};


// Export provider constructor
module.exports = Provider;

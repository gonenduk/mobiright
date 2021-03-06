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
  var uri = this.url + "/getapps/" + this.key;
  var formData = {
    ip: req.ip,
    ua: req.headers['user-agent']
  };
  request.post({url: uri, form: formData}, afterProvider.bind(this));

  // Callback function after request return
  function afterProvider(err, res, body) {
    // On error log return empty results
    if (err || res.statusCode != 200) {
      console.log("Could not get from Ads4You:");
      console.log(body);
      return callback([]);
    }

    // Convert JSON to array
    var topApps = JSON.parse(body).offers;

    // Concat games and tools (if exist)
    var games = 'games' in topApps ? topApps.games : [];
    var tools = 'tools' in topApps ? topApps.tools : [];
    topApps = games.concat(tools);

    // Get top n apps
    topApps = datamgr.getTop(n, 'rate', topApps);

    // Normalize and return
    callback(datamgr.normalizeArray(this.map, topApps))
  }
};


// Export provider constructor
module.exports = Provider;

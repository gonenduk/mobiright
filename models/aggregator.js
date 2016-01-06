var config = require('../config');
var datamgr = require('./datamgr');

/**
 * Aggregator object
 */

var aggregator = {
  providers: {},        // will hold a map of providers (by name)
  numProviders: 0,      // number of providers

  // Add a provider (can be used to add a provider in runtime as well with a future API)
  add: function (name, settings) {
    var p = require('./providers/' + name);
    this.providers[name] = new p(name, settings);
    this.numProviders++;
  },

  // Delete a provider (by name)
  delete: function (name) {
    if (name in this.providers) {
      delete this.providers[name];
      this.numProviders--;
    }
  },

  // Get top n rated apps from all providers
  getTopApps: function (n, req, callback) {
    var topApps = [];
    var numFinished = 0;

    // Iterate on providers and get their top apps
    for (name in this.providers) {
      this.providers[name].getTopApps(n, req, finish.bind(this));
    }

    function finish(providerTopApps) {
      // Another provider has finished
      topApps = topApps.concat(providerTopApps);
      numFinished++;

      // Make sure all providers finished retrieving their top apps
      if (numFinished < this.numProviders)
        return;

      // Return only top n apps
      callback(datamgr.getTop(n, 'rating', topApps));
    }
  }
};

// Initialize aggregator with providers from config file
for (name in config.providers) {
  aggregator.add(name, config.providers[name]);
}


// Export aggregator
module.exports = aggregator;

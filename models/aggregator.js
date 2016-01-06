var config = require('../config');
var datamgr = require('./datamgr');

/**
 * Aggregator object
 */

var aggregator = {
  providers: {},       // will hold a map of providers (by name)

  // Add a provider (can be used to add a provider in runtime as well with a future API)
  add: function (name, settings) {
    var p = require('./providers/' + name);
    this.providers[name] = new p(name, settings);
  },

  // Delete a provider (by name)
  delete: function (name) {
    delete this.providers[name];
  },

  // Get top n rated apps from all providers
  getTop: function (n) {
    // Iterate on providers and concat their tops
    var tops = [];
    for (name in this.providers) {
      tops.concat(this.providers[name].getTop(n));
    }

    // Return only top n apps
    return datamgr.getTop(n);
  }
};

// Initialize aggregator with providers from config file
for (name in config.providers) {
  aggregator.add(name, config.providers[name]);
}


// Export aggregator
module.exports = aggregator;

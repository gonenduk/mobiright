var datamgr = require('../datamgr');

/**
 * Ads4You object
 */

function Provider(name, settings) {
  this.name = name;
  this.url = settings.url;
  this.key = settings.key;
}

Provider.prototype.getTopApps = function(n, req, callback) {
  // Get top apps from provider

  // Concat games and tools

  // Sort

  // Normalize
};


// Export provider constructor
module.exports = Provider;

var datamgr = require('../datamgr');

/**
 * Ads2All object
 */

function Provider(name, settings) {
  this.name = name;
  this.url = settings.url;
  this.key = settings.key;
}

Provider.prototype.getTop = function(n) {
  // Get top apps from provider

  // Sort

  // Normalize
};


// Export provider constructor
module.exports = Provider;

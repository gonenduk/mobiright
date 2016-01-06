var datamgr = require('../datamgr');

/**
 * Ads2All object
 */

function Provider(name, settings) {
  this.name = name;
  this.url = settings.url;
  this.key = settings.key;
}


// Export provider constructor
module.exports = Provider;

var config = {
  /**
   * Development
   */
  development: {

    server: {
      port: 3000
    },

    // array of providers
    providers: {
      'Ads2All' : {
        url: 'http://assignment-ads2all.mobiright.com',
        key: 'A3f4Gt'
      },
      'Ads4You' : {
        url: 'http://assignment-ads4you.mobiright.com',
        key: '3FsC41'
      }
    }
  },

  /**
   * Production
   */
  production: {

    server: {
      port: 80
    },

    // array of providers
    providers: []
  },

  /**
   * Staging
   */
  staging: {

    server: {
      port: 80
    },

    // array of providers
    providers: []
  }
};

/***
 * Return the right configuration according to NODE_ENV environment variable
 */

module.exports = config[process.env.NODE_ENV || 'development'];

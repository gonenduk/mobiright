/**
 * Data Manager object
 */

module.exports = {

  /**
   * Convert records of data to API records
   */

  normalize: function (map, source) {
    var target = {};

    // Copy properties defined in map and replace their name
    for (prop in source) {
      if (prop in map) {
        target[map[prop]] = source[prop]
      }
    }

    return target;
  },

  normalizeArray: function (map, source) {
    return source.map(this.normalize.bind(this, map));
  },

  /**
   * Concat list of arrays
   */
  concatArrays: function (arr1, arr2) {
    return arr1.concat(arr2);
  },

  /**
   * Return top n elements in array according to specific field
   */
  getTop: function (n, prop, arr) {
    return arr.sort(function(a, b){return b[prop] - a[prop]}).slice(0, n);
  }
};

const NodeCache = require('node-cache');

const cache = new NodeCache({ 
  stdTTL: 60 * 60, // 1 hour depend on expired token
  checkperiod: 5 * 60 // 5 minutes
});

module.exports = cache;

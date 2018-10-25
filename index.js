if (process.env.NODE_ENV === 'production') {
  module.exports = require('./cjs/webgl.production.min.js');
} else {
  module.exports = require('./cjs/webgl.development.js');
}

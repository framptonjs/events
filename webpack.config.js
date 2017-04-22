const { resolve } = require('path');

module.exports = {

  entry: {
    'events': './dist/index.js'
  },

  output: {
    filename: '[name].js',
    path: resolve('dist/bundles'),
    library: '@frampton/events',
    libraryTarget: 'commonjs2'
  },

  externals : {
    '@frampton/core': {
      commonjs2: "@frampton/core"
    },
    '@frampton/style': {
      commonjs2: "@frampton/style"
    }
  },

  resolve: {
    extensions: [ '.js' ]
  }
};

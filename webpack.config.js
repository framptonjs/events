const { resolve } = require("path");

module.exports = {

  entry: {
    "events": "./dist/index.js"
  },

  output: {
    filename: "[name].js",
    path: resolve("dist/bundles"),
    library: "@frampton/events",
    libraryTarget: "commonjs2"
  },

  module: {
    loaders: [
      {
        test: /\.js?/,
        loader: "babel-loader"
      }
    ]
  },

  externals : {
    "@frampton/core": {
      commonjs2: "@frampton/core"
    },
    "@frampton/style": {
      commonjs2: "@frampton/style"
    }
  },

  resolve: {
    extensions: [ ".js" ]
  },

  // Source maps support ("inline-source-map" also works)
  devtool: "source-map"
};

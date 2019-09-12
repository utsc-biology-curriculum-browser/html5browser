const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: {
    server: './src/web/index.js',
  },
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'dist')
  },
  target: 'node',
  node: {
    __dirname: true
  },
  externals: [nodeExternals()]
};
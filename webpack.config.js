const path = require('path');
const nodeExternals = require('webpack-node-externals');


// Build server side code
const appConfig = {
  entry: './src/web/index.js',
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

const frontendConfig = {
    entry: './src/frontend/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist/static')
    },
    target: 'web',
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: ['file-loader']
            }
        ]
    }
}

module.exports = [appConfig, frontendConfig];
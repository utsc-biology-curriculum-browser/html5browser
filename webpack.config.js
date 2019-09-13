const path = require('path');
const nodeExternals = require('webpack-node-externals');
const CopyPlugin = require('copy-webpack-plugin');


// Build server side code
const appConfig = {
  entry: './src/web/index.js',
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'target')
  },
  target: 'node',
  node: {
    __dirname: true
  },
  externals: [nodeExternals()]
};

// Build frontend side code
const frontendConfig = {
    entry: './src/frontend/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'target/static')
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
                loader: 'file-loader',
                options: {
                  outputPath: 'media',
                  name: '[name].[ext]'
                },
            }
        ]
    },
    plugins: [
        new CopyPlugin([
            { from: './src/views', to: path.resolve(__dirname, 'target/views') }
        ])
    ]
};

module.exports = [appConfig, frontendConfig];
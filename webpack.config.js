var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: {
        GameView: [
            './src/index.js',
        ], 
        'GameView.min': [
            './src/index.js',
        ], 
    },
    output: {
        path: path.join(__dirname, 'dist'),
        publicPath: '/',
        filename: '[name].js',
    },
    // devtool: 'source-map',
    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" },
            { test: /\.less$/, loader: "style-loader!css-loader!less-loader" },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    presets: ['es2015', 'stage-2', 'react'],
                    plugins: [
                        'add-module-exports',
                        'transform-es2015-modules-umd',
                    ],
                },
            },
        ]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            include: /\.min\.js$/,
            minimize: true,
            compress: {
                warnings: false,
            },
            comments: false
        }),
        new webpack.NoErrorsPlugin()
    ]
};
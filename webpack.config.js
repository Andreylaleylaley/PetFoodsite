let path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/js/script.js',
    output: {
        filename: 'bundle.js',
        path: __dirname + '/dist/js',
        clean: true
    },
    watch: true,
    devtool: "source-map",

    module:{
        rules: [
            {
                test: /\.(png|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
             },
            {
                test: /\.svg$/,
                type: 'asset/resource',
                generator: {
                filename: path.join('icons', '[name].[contenthash][ext]'),
                }
            }
        ]
}
}
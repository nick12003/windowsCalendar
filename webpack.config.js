const path = require('path');
const env = require('dotenv').config();
module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, './dist'),
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'babel-loader',
                    options:
                    {
                        presets: ['@babel/preset-env', "@babel/preset-react"],
                    },
                }]
            },
            {
                test: /\.(sass|scss)$/i,
                use: [
                    "style-loader",
                    "css-loader",
                    "postcss-loader",
                    "sass-loader"
                ],
            },
        ]
    }

};
const path = require('path');
const BundleDeclarationsWebpackPlugin = require('bundle-declarations-webpack-plugin');

module.exports = {
    entry: './temp/index.js',
    target: 'web',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js',
        library: {
            type: 'umd',
            name: 'ms',
        },
        globalObject: 'globalThis',
    },
    mode: 'production',
    devtool: 'source-map',
    resolve: {
        extensions: ['.js', '.ts'],
    },
    plugins: [
        new BundleDeclarationsWebpackPlugin({
            entry: ['src/index.ts'],
            outFile: 'index.d.ts',
        }),
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
        ],
    },
};

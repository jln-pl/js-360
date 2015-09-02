module.exports = {
    entry: './src/module.js',
    output: {
        library: 'js360',
        libraryTarget: 'umd',
        path: __dirname,
        filename: 'dist/js360.min.js',
    },
    externals: {
        'rx': 'rx'
    },
    resolve: {
        extensions: ['', '.js']
    },
    module: {
        loaders: [{
            test: /.js$/,
            loader: 'babel-loader'
        }]
    }
};

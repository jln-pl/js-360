module.exports = function (config) {
    config.set({
        basePath: '',

        frameworks: ['jasmine'],

        files: [
            'spec/**/*Spec.js'
        ],
        preprocessors: {
            'spec/**/*.js': ['webpack']
        },

        plugins: [
            'karma-jasmine',
            'karma-phantomjs-launcher',
            'karma-webpack'
        ],

        webpack: {
            module: {
                loaders: [{
                    test: /.js$/,
                    loader: 'babel-loader'
                }]
            }
        },

        webpackMiddleware: {
            noInfo: true
        },

        reporters: ['progress'],

        port: 9876,

        colors: true,

        logLevel: config.LOG_DISABLE,

        autoWatch: true,

        browsers: ['PhantomJS'],

        singleRun: true
    });
};

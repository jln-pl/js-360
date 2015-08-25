module.exports = function (config) {
    config.set({
        basePath: '',

        frameworks: ['browserify', 'jasmine'],

        files: [
            'node_modules/rx/dist/rx.lite.min.js',
            'src/module.js',
            'src/**/*.js',
            'spec/**/*Spec.js'
        ],
        preprocessors: {
            'src/**/*.js': ['browserify'],
            'spec/**/*.js': ['browserify']
        },

        coverageReporter: {
            reporters: [
                {type: 'lcov', dir: 'coverage/', subdir: 'lcov-info'},
                {type: 'text-summary'},
                {type: 'text'}
            ]
        },

        browserify: {
            debug: true,
            transform: [
                'babelify',
                'istanbulify'
            ]
        },

        plugins: [
            'karma-jasmine',
            'karma-phantomjs-launcher',
            'karma-browserify',
            'karma-coverage'
        ],

        reporters: ['progress', 'coverage'],

        port: 9876,

        colors: true,

        logLevel: config.LOG_DISABLE,

        autoWatch: true,

        browsers: ['PhantomJS'],

        singleRun: true
    });
};

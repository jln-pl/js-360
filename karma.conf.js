module.exports = function(config) {
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

        // coverageReporter: {
        //     reporters:[
        //         {type: 'lcov', dir:'coverage/', subdir: 'lcov-info'},
        //         {type: 'text-summary'},
        //         {type: 'text'},
        //         {type: 'cobertura'}
        //     ]
        // },

        browserify: {
            debug: true,
            transform: [
                ['babelify']
            ]
        },


        plugins : [
            'karma-jasmine',
            'karma-phantomjs-launcher',
            'karma-browserify',
        ],

        reporters: ['progress'],

        port: 9876,

        colors: true,

        logLevel: config.LOG_INFO,

        autoWatch: true,

        browsers: ['PhantomJS'],

        singleRun: true
    });
};
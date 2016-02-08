 var webpack = require('webpack');

module.exports = function (grunt) {
    grunt.initConfig({
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            files: [
            'Gruntfile.js',
            'karma.conf.js',
            'src/**/*.js',
            'spec/**/*.js'
            ]
        },
        clean: {
            build: ['./dist'],
            tmp: ['tmp']
        },
        karma: {
            unit: {
                configFile: 'karma.conf.js'
            }
        },
        webpack: {
            build: {
                entry: './src/module.js',
                output: {
                    library: 'js360',
                    libraryTarget: 'umd',
                    path: __dirname,
                    filename: 'dist/js360.min.js',
                },
                externals: {
                    'Rx': 'Rx'
                },
                resolve: {
                    extensions: ['', '.js']
                },
                plugins: [
                    new webpack.optimize.UglifyJsPlugin({
                        compress: {
                             warnings: false
                        }
                    })
                ],
                module: {
                    loaders: [{
                        test: /.js$/,
                        loader: 'babel-loader'
                    }]
                }
            }
        }
    });

grunt.loadNpmTasks('grunt-contrib-jshint');
grunt.loadNpmTasks('grunt-contrib-clean');
grunt.loadNpmTasks('grunt-karma');
grunt.loadNpmTasks('grunt-webpack-without-server');

grunt.registerTask('build', ['clean', 'jshint', 'karma', 'webpack', 'clean:tmp']);
grunt.registerTask('test', ['jshint', 'karma']);
};

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
        babel: {
            options: {
                sourceMap: false,
                blacklist: ["strict"]
            },
            dist: {
                files: [{
                    "expand": true,
                    "cwd": "./src/",
                    "src": ["**/*.js"],
                    "dest": "tmp",
                    "ext": ".js"
                }]
            }
        },
        browserify: {
            dist: {
                src: 'tmp/module.js',
                dest: 'tmp/module.js'
            }
        },
        clean: {
            build: ['./dist'],
            tmp: ['tmp']
        },
        uglify: {
            options: {
                beautify: false
            },
            target: {
                files: {
                    'dist/js360.min.js': ['node_modules/rx/dist/rx.lite.min.js', 'tmp/module.js']
                }
            }
        },
        karma: {
            unit: {
                configFile: 'karma.conf.js'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-babel');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-karma');

    grunt.registerTask('build', ['clean', 'jshint', 'karma', 'babel', 'browserify', 'uglify', 'clean:tmp']);
    grunt.registerTask('test', ['jshint', 'karma']);
};

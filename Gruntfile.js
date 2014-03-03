'use strict';

module.exports = function (grunt) {
    var sourceFiles = ['src/dtable.interfaces.js', 'src/_interfaces/*.js' , 'src/dtable.modules.js', 'src/**/*.js'];
    var webdir = "server/web"
    // Project configuration.
    grunt.initConfig({
        // Metadata.
        webdir: "server/web",
        pkg: grunt.file.readJSON('package.json'),
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
            '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
            '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
            '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
            ' Licensed MIT */\n',
        uglify: {
            build: {
                files: {
                    'build/<%= pkg.name %>.jquery.min.js': sourceFiles
                },
                options: {
                    banner: '<%= banner %>',
                    sourceMap: function (path) {
                        return path + ".map";
                    },
                    sourceMappingURL: function (path) {
                        return path.slice(6) + ".map";
                    }
                }
            }
        },
        clean: {
            server: ["build", "<%= webdir %>/js", "<%= webdir %>/css", "<%= webdir %>/fonts"],
            build: ["build", "<%= webdir %>/js", "<%= webdir %>/css", "<%= webdir %>/fonts"],
            publish: ["tmp"]
        },
        copy: {
            build: {
                files: [
                    {expand: true, cwd: 'build', src: ['**'], dest: webdir + '/js/<%= pkg.name %>/'},
                    {expand: true, cwd: 'src', src: ['**'], dest: webdir + '/js/src/'},
                    {src: "bower_components/jquery/jquery.js", dest: "<%= webdir %>/js/jquery.js"},
                    {src: "bower_components/nunjucks/browser/nunjucks.js", dest: "<%= webdir %>/js/nunjucks.js"},
                    {expand: true, cwd: 'bower_components/bootstrap/dist', src: ['**'], dest: '<%= webdir %>/'}
                ]
            },
            views: {
                files: [
                    {expand: true, cwd: 'views', src: ['**'], dest: '<%= webdir %>/js/<%= pkg.name %>/views'},
                    {expand: true, cwd: 'views', src: ['**'], dest: 'build/views'}
                ]
            },
            readme: {
                files: [
                    {expand: true, src: ['README.md'], dest: 'build'}
                ]
            },
            publish: {
                files: [
                    {expand: true, cwd: 'publish', src: ['**'], dest: '<%= webdir %>/publish'},
                ]
            }
        },
        watch: {
            options: {
                livereload: true
            },
            scripts: {
                files: 'src/**/*.js',
                tasks: ['build-server']
            },
            view: {
                files: 'views/**',
                tasks: ['build-server']
            },
            example: {
                files: ['server/**/*.php']
            }
        },
        php: {
            server: {
                options: {
                    port: 8080,
                    base: '<%= webdir %>'
                }
            }
        },
        shell: {
            createdb: {
                options: {
                    stdout: true,
                    stderr: true,
                    failOnError: true
                },
                command: "php server/CreateTables.php --no-confirmation"
            }
        },
        concat: {
            options: {
                separator: ";",
                stripBanners: true,
                banner: '<%= banner %>'
            },
            build: {
                src: sourceFiles,
                dest: 'build/<%= pkg.name %>.jquery.js'
            }
        },
        compress: {
            tarIt: {
                options: {
                    mode: 'tar',
                    archive: 'tmp/<%= pkg.name %>.v<%= pkg.version %>.tar'
                },
                expand: true,
                cwd: 'build',
                src: ['**/*']
            },
            gzIt: {
                expand: true,
                cwd: 'tmp',
                src: '**/*',
                dest: 'publish'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-php');
    grunt.loadNpmTasks('grunt-shell');

    // build prod files
    grunt.registerTask('build', ['clean:build', 'uglify', 'concat', 'copy:build', 'copy:views', 'copy:readme']);

    // build for server
    grunt.registerTask('build-server', ['clean:server', 'uglify', 'concat', 'copy:build', 'copy:views', 'copy:readme'])

    // start server
    grunt.registerTask('server', ['build', 'php', 'shell:createdb', 'watch']);

    // publish new version
    grunt.registerTask('publish', ['build', 'clean:publish', 'compress:tarIt', 'compress:gzIt', 'clean:publish', 'copy:publish']);

    // Default task
    grunt.registerTask('default', ['build']);
};

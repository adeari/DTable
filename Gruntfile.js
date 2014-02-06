'use strict';

module.exports = function (grunt)
{
    var sourceFiles = ['src/dtable.modules.js', 'src/dtable.jquery.js', 'src/*'];
    var webdir = "server/web"
    // Project configuration.
    grunt.initConfig({
        // Metadata.
        webdir: "server/web",
        pkg:     grunt.file.readJSON('package.json'),
        banner:  '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
                     '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
                     '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
                     '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
            ' Licensed MIT */\n',
        uglify:  {
            build: {
                files:   {
                    'build/<%= pkg.name %>.jquery.min.js': sourceFiles
                },
                options: {
                    banner: '<%= banner %>',
                    sourceMap: function(path) {
                        return path + ".map";
                    },
                    sourceMappingURL: function(path) {
                        return path.slice(6) + ".map";
                    }
                }
            }
        },
        clean: {
            server: ["build", "<%= webdir %>/js", "<%= webdir %>/css", "<%= webdir %>/fonts"],
            build: ["build", "<%= webdir %>/js", "<%= webdir %>/css", "<%= webdir %>/fonts"]
        },
        copy:    {
            build: {
                files: [
                    {expand: true, cwd: 'build', src: ['**'], dest: webdir + '/js/<%= pkg.name %>/'},
                    {expand: true, cwd: 'src', src: ['**'], dest: webdir + '/js/<%= pkg.name %>/src/'},
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
            }
        },
        watch:   {
            options: {
                livereload: true
            },
            scripts: {
                files: 'src/*.js',
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
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-php');
    grunt.loadNpmTasks('grunt-shell');

    // build prod files
    grunt.registerTask('build', ['clean:build', 'uglify', 'copy']);

    // build for server
    grunt.registerTask('build-server', ['clean:server', 'uglify', 'copy'])

    // start server
    grunt.registerTask('server', ['build', 'php', 'shell', 'watch']);

    // Default task
    grunt.registerTask('default', ['build']);
};

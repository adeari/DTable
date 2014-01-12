'use strict';

module.exports = function (grunt)
{
    var sourceFiles = ['src/dtable.modules.js', 'src/dtable.jquery.js', 'src/*'];
    // Project configuration.
    grunt.initConfig({
        // Metadata.
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
        clean: ["build", "www-root/js"],
        copy:    {
            build: {
                files: [
                    {expand: true, cwd: 'build', src: ['**'], dest: 'www-root/js/<%= pkg.name %>/'},
                    {expand: true, cwd: 'src', src: ['**'], dest: 'www-root/js/<%= pkg.name %>/src/'},
                    {src: "bower_components/jquery/jquery.js", dest: "www-root/js/jquery.js"},
                    {src: "bower_components/nunjucks/browser/nunjucks.js", dest: "www-root/js/nunjucks.js"}
                ]
            },
            views: {
                files: [
                    {expand: true, cwd: 'views', src: ['**'], dest: 'www-root/js/<%= pkg.name %>/views'},
                    {expand: true, cwd: 'views', src: ['**'], dest: 'build/views'},
                ]
            }
        },
        watch:   {
            options: {
                livereload: true
            },
            scripts: {
                files: 'src/*.js',
                tasks: ['build']
            },
            example: {
                files: ['www-root/**']
            }
        },
        php: {
            server: {
                options: {
                    port: 8080,
                    base: 'www-root'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-php');

    grunt.registerTask('build', ['clean', 'uglify', 'copy']);
    grunt.registerTask('server', ['build', 'php', 'watch']);

    // Default task(s).
    grunt.registerTask('default', ['build']);

};
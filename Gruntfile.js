module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        copy: {
            dev: {
                files: [
                    {expand: true, cwd: 'src/', src: ['**'], dest: 'build/dev/'}
                ]
            }
        }
    });

    //Load libraries
    grunt.loadNpmTasks('grunt-contrib-copy');

    // Task Registration
    grunt.registerTask('dev', ['copy']);

};
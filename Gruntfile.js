module.exports = function (grunt) {
    grunt.initConfig({
        less: {
            development: {
                options: {
                    optimization: 2
                },
                files: {
                    'dist/main.css': 'src/css/main.less'
                }
            },
        },

        cssmin: {
            options: {
                mergeIntoShorthands: false,
                roundingPrecision: -1
            },
            target: {
                files: {
                    'dist/main.min.css': ['dist/main.css']
                }
            }
        },
        clean: ['dist/main.css'],
        watch:{
            options:{
                livereload:true,
            },
            css:{
                files:['./src/css/*.less'],
                tasks:['less','cssmin','clean'],
            },
        },

    });

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['less', 'cssmin', 'clean']);

};

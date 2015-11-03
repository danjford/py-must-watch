'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

    clean: ['dist'],

    less: {
      site: {
        files: {
          "dist/css/styles.css": "src/less/base.less"
        }
      }
    },

    copy : {
      index: {
        files: [{
          expand: true,
          cwd: 'src/',
          src: ['index.html'],
          dest: 'dist/'
        }]
      },
      images: {
        files: [{
          expand: true,
          cwd: 'src/images/',
          src: ['**'],
          dest: 'dist/images/'
        }]
      },
      data: {
        files: [{
          expand: true,
          cwd: 'src/data/',
          src: ['**'],
          dest: 'dist/data/'
        }]
      },
      fonts: {
        files: [{
          expand: true,
          cwd: 'node_modules/bootstrap/fonts/',
          src: ['**'],
          dest: 'dist/fonts/'
        }]
      }
    },

    jshint: {
      options : {
        jshintrc : '.jshintrc'
      },
      beforeconcat: [
        'src/js/*.js'
      ]
    },

    concat: {
      app: {
        src: [
          'src/js/controller.js',
          'src/js/scripts.js',
          'src/js/youtube.js'
        ],
        dest: 'dist/js/app.js'
      },
      jsLibs: {
        src: [
          'node_modules/jquery/dist/jquery.js',
          'node_modules/angular/angular.js'
        ],
        dest: 'dist/js/libs.js'
      },
      cssLibs: {
        src: [
          'node_modules/bootstrap/dist/css/bootstrap.css'
        ],
        dest: 'dist/css/libs.css'
      }
    },

    uglify: {
      js: {
        files: [{
          expand: true,
          cwd: 'dist/js',
          src: '**/*.js',
          dest: 'dist/js'
        }]
      }
    },

    cssmin: {
      options: {
        keepSpecialComments: 0
      },
      css: {
        files: [{
          expand: true,
          cwd: 'dist/css/',
          src: '**/*.css',
          dest: 'dist/css'
        }]
      }
    },

    connect: {
      dev: {
        options: {
          port: 8080,
          base: 'dist'
        }
      }
    },

    watch: {
      index: {
        files: 'src/index.html',
        tasks: ['copy:index']
      },
      js: {
        files: 'src/js/*.js',
        tasks: ['jshint', 'concat:jsLibs']
      },
      less: {
        files: 'src/less/*.less',
        tasks: ['less']
      },
      images: {
        files: 'src/images/**/*',
        tasks: ['copy:images']
      },
      data: {
        files: 'src/data/**/*',
        tasks: ['copy:data']
      }
    }

  });

  // Load all of Grunt's dependencies
  require('matchdep')
    .filterDev('grunt-*')
    .forEach(grunt.loadNpmTasks);

  grunt.registerTask('default', ['clean', 'copy', 'jshint', 'concat', 'less', 'connect:dev', 'watch']);

  grunt.registerTask('build', ['clean', 'copy', 'jshint', 'concat', 'uglify', 'less', 'cssmin']);

};
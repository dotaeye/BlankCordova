var webpack = require('webpack');
var path = require('path');
var fs = require('fs');
var babelrc = fs.readFileSync('./.babelrc');
var babelLoaderQuery = {};

try {
    babelLoaderQuery = JSON.parse(babelrc);
    console.log(babelLoaderQuery);
} catch (err) {
    console.error('==>     ERROR: Error parsing your .babelrc.');
    console.error(err);
}

module.exports = function (grunt) {
    require("load-grunt-tasks")(grunt);

    grunt.initConfig({

        copy: {
            images: {
                expand: true,
                cwd: 'src/',
                src: '[src/assets/images/**]',
                dest: 'www/'
            }
        },

  		less: {
            dev: {
                files: {
                    "./www/css/index.css": "./src/assets/css/main.less"
                }
            },
            prod: {
                files: {
                    "./www/css/index.css": "./src/assets/css/main.less"
                },
                options: {
                    compress: true
                }
            }
        },

        webpack: {
        	dev: {
   				resolve: {
                    extensions: ['', '.js', '.jsx']
                },
                entry: './src/app.js',
                output: {
                    path: './www/scripts',
                    filename: 'app.js'
                },
                module:{
                	 loaders: [{
                            test: /\.jsx?$/,
                            exclude: /node_modules/,
                            loaders: ['babel?' + JSON.stringify(babelLoaderQuery)]
                     }]
                },
                plugins: [
                    new webpack.optimize.OccurenceOrderPlugin()
                ],
                devtool: "source-map"
        	},
        	prod: {
				resolve: {
                    extensions: ['', '.js', '.jsx']
                },
                entry: './src/app.js',
                output: {
                    path: './www/scripts',
                    filename: 'app.min.js'
                },
                module:{
                	 loaders: [{
                            test: /\.jsx?$/,
                            exclude: /node_modules/,
                            loaders: ['babel?' + JSON.stringify(babelLoaderQuery)]
                        }
                    ]
                },
                plugins: [
                	new webpack.optimize.UglifyJsPlugin({
                        compress: {
                            warnings: false
                        },
                        output: {
                            comments: false
                        }
                    })
                ]

        	}
        }
    });
	grunt.registerTask('default', ['copy:images', 'less:dev','webpack:dev']);
    grunt.registerTask('prod', ['copy:images', 'less:prod','webpack:prod']);
};
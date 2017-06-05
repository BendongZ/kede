var gulp = require('gulp');
var webserver = require('gulp-webserver');
//引入gulp-webpack包
var webpack = require('gulp-webpack');

//文件名提取包
var named = require('vinyl-named');
gulp.task('copy-index',function(){
	gulp.src('src/*.html').pipe(gulp.dest('build'))
})

gulp.task('webserver',function(){
	gulp.src('build/').pipe(
		webserver({
			host:'localhost',
			port:'8000',
			directoryListing:{
				enable:true,
				path:'build'
			},
			livereload:true
		})
	)
})

gulp.task('watch',function(){
	gulp.watch('./src/*.html',['copy-index'])
	gulp.watch('./src/script/*.js',['packjs'])
})

gulp.task('packjs',function(){
	gulp.src('./src/script/app.js')
	.pipe(named())
	.pipe(webpack({
		output:{
			filename:'[name].js'
		},
		module:{
			loaders:[
				{
					test:/\.js$/,
					loader:'imports-loader',
					exclude:'./node_modules'
				}
			]
		}
	}))
	.pipe(gulp.dest('./build/script/'))
})

gulp.task('default',['copy-index','webserver','watch'],function(){
	console.log("done...");
})

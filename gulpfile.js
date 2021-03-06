const source_folder = '#src',
    dist = 'dist',
    gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync').create(),
    uglify = require('gulp-uglify-es').default,
    concat = require('gulp-concat'),
    autoprefixer = require('gulp-autoprefixer'),
    babel = require('gulp-babel'),
    rename = require('gulp-rename'),
    jsmin = require('gulp-jsmin'),
    del = require('del');
    
gulp.task('clean', async function(){
        del.sync(dist)
      })

gulp.task('scss', async function(){
    return gulp.src(source_folder + '/scss/*.scss')
        .pipe(sass({outputStyle: "expanded"}))
        .pipe(autoprefixer())
        .pipe(gulp.dest(source_folder + '/css'))
        .pipe(browserSync.stream());
}) 
gulp.task('scssCompress', async function(){
    return gulp.src(source_folder + '/scss/*.scss')
        .pipe(sass({outputStyle: "compressed"}))
        .pipe(autoprefixer())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(source_folder + '/css'))
        .pipe(browserSync.stream());
}) 
gulp.task('css', async function() {
    return gulp.src(source_folder + '/css/style.css')
    .pipe(concat('style.min.css'))
    .pipe(gulp.dest(source_folder + '/css'))
})
gulp.task('js', async function(){
    return gulp.src([
        source_folder + '/js/jquery-3.5.1.js',
        source_folder + '/js/jquery.mask.js',
        source_folder + '/js/slick.js',
        source_folder + '/js/main.js'
    ])
    .pipe(concat('libs.js'))
    .pipe(gulp.dest(source_folder + '/js'))
    .pipe(browserSync.stream());
})
gulp.task('bs', async function(){
    return gulp.src(source_folder)
    .pipe(browserSync.stream());
})
gulp.task('jsCompress', function () {
    return gulp.src(source_folder + '/js/libs.js')
        .pipe(babel({
            presets: [['@babel/preset-env']]
        }))
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(source_folder + '/js'))
    
});


gulp.task('watch', function(){
    gulp.watch(source_folder + '/scss', gulp.parallel('scss'))
    gulp.watch(source_folder + '/js/main.js', gulp.parallel('js'))
    gulp.watch(source_folder + '/*.html', gulp.parallel('bs'))
})

gulp.task('browser-sync', function(){
    browserSync.init({
        server: {
            baseDir: source_folder + "/"
        }
    })
})

gulp.task('export', async function(){
    let buildHtml = gulp.src(source_folder + '/*.html')
    .pipe(gulp.dest(dist))
    let buildIcon = gulp.src(source_folder + '/favicon/**/*')
    .pipe(gulp.dest(dist +'/favicon'))
    let buildCss = gulp.src(source_folder +'/css/*.css')
    .pipe(gulp.dest(dist +'/css'))
    let buildFonts = gulp.src(source_folder + '/fonts/**/*.*')
    .pipe(gulp.dest(dist + '/fonts'))
    let buildImg = gulp.src(source_folder + '/img/*.*')
    .pipe(gulp.dest(dist + '/img'))
    let buildJs = gulp.src(source_folder +'/js/*.js')
    .pipe(gulp.dest(dist + '/js'))
     
})
gulp.task('build', gulp.series('clean','export'))

gulp.task('default',  gulp.parallel('browser-sync','watch'))




const gulp        = require('gulp');
const browserSync = require('browser-sync');
const sass        = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const rename = require("gulp-rename");
const imagemin = require('gulp-imagemin');
const htmlmin = require('gulp-htmlmin');


gulp.task('server', function() {
    browserSync({
        browser: ["firefox.exe"],
        server: {
            baseDir: "dist"  
        }
    });

    gulp.watch("src/*.html").on('change', browserSync.reload);
});


gulp.task('styles', function() {
    return gulp.src("src/sass/**/*.+(scss|sass)")
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(rename({suffix: '.min', prefix: ''}))
        .pipe(autoprefixer())
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest("dist/css"))
        .pipe(gulp.dest("src/css"))
        .pipe(browserSync.stream());
});


gulp.task('styles2', function() {
return gulp.src("src/sass/**/*.+(scss|sass)")
        .pipe(sass().on('error', sass.logError))
        .pipe(rename({suffix: '.max', prefix: ''}))
        .pipe(autoprefixer())
        .pipe(gulp.dest("src/css"))
        .pipe(browserSync.stream());
    });


gulp.task('directories', function () {
    return gulp.src('*.*', {read: false})
        .pipe(gulp.dest('src/css'))
        .pipe(gulp.dest('src/img'))
        .pipe(gulp.dest('src/img/content'))
        .pipe(gulp.dest('src/img/icons'))
        .pipe(gulp.dest('src/fonts'))
        .pipe(gulp.dest('src/js'))
        .pipe(gulp.dest('./maket'))
        .pipe(gulp.dest('src/sass'));

});



gulp.task('watch', function() {
    gulp.watch("src/sass/**/*.+(scss|sass|css)", gulp.parallel('styles', 'styles2'));
    gulp.watch("src/*.html").on('change', gulp.parallel('html'));
    gulp.watch("src/js/**/*.js").on('change', gulp.parallel('scripts'));
    gulp.watch("src/fonts/**").on('change', gulp.parallel('fonts'));
    gulp.watch("src/img/icons/**/*").on('change', gulp.parallel('icons'));
    gulp.watch("src/img/**").on('change', gulp.parallel('img'));
});

gulp.task('html', function(){
    return gulp.src("src/*.html")
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest("dist/"));
});

gulp.task('scripts', function(){
    return gulp.src("src/js/**/*.js")
        .pipe(gulp.dest("dist/js"));
});

gulp.task('fonts', function(){
    return gulp.src("src/fonts/**")
        .pipe(gulp.dest("dist/fonts"));
});

gulp.task('icons', function(){
    return gulp.src("src/img/icons/**/*")
        .pipe(gulp.dest("dist/img/icons"));
});

gulp.task('img', function(){
    return gulp.src("src/img/**")
        .pipe(imagemin())
        .pipe(gulp.dest("dist/img"));
});
gulp.task('default', gulp.parallel('watch', 'server', 'styles', 'styles2', 'directories', 'scripts', 'fonts', 'img', 'html'));
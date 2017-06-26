var gulp = require("gulp")
var sass = require("gulp-sass")
var autoprefixer = require("gulp-autoprefixer")
var shorthand = require("gulp-shorthand")
var minify = require("gulp-cssnano")
var sourcemaps = require("gulp-sourcemaps")

// Gulp task for building styles onces
gulp.task("build-styles", function() {
    
    return gulp.src(["./resources/styles/webapp.scss", "./resources/styles/statics.scss"])
        .pipe(sourcemaps.init())
        .pipe(sass().on("error", sass.logError))
        .pipe(autoprefixer({
            browsers: ["last 2 versions"],
            cascade: false
        }))
        .pipe(shorthand())
        .pipe(minify())
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest("./resources/build"))

})

// Gulp task for watching styles
gulp.task("watch-styles", function() {

    gulp.watch("resources/styles/**/*.scss", ["build-styles"])

})

// Gulp task for building then watching styles
gulp.task("styles", ["build-styles", "watch-styles"])
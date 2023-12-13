// GULP
const { src, dest, watch, series, parallel } = require('gulp');

// CSS Y SASS
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');

// CSS de última generación para navegadores inconpatibles, package.json
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

// IMAGENES
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const avif = require('gulp-avif');

function css(done) {
    // compilar sass
    // pasos| 1 - identificar archivo, 2 - compilar, 3 - guardarla en .css
    src('src/scss/app.scss')
        .pipe( sourcemaps.init() )
        .pipe(sass())
        .pipe(postcss([ autoprefixer(), cssnano() ]))
        .pipe( sourcemaps.write('.') )
        .pipe(dest('build/css'));
    done();
}
function dev() {
    watch('src/scss/**/*.scss', css);
    watch('src/img/**/*', imagenes);
}
function imagenes() {
    return  src('src/img/**/*')
                .pipe(imagemin({optimizationLevel: 3}))
                .pipe(dest('build/img'));
}
function versionWebp() {
    const opciones = {
        quality: 50
    }
    return  src('src/img/**/*.{png,jpg}')
            .pipe( webp(opciones) )
            .pipe( dest('build/img') );
}
function versionAvif() {
    const opciones = {
        quality: 50
    }
    return  src('src/img/**/*.{png,jpg}')
            .pipe( avif( opciones ) )
            .pipe( dest('build/img') );
}

// Posible error: npm install --save-dev gulp-imagemin@7.1.0

exports.css = css;
exports.watch = dev;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.default = series(imagenes, versionWebp, versionAvif, css, dev);
exports.imagenes = imagenes;

// series - Se inicia una tarea y hasta que finaliza, inicia la siguiente.
// parallel - Todas las tareas inician al mismo tiempo.



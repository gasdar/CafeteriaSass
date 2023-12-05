// GULP
const { src, dest, watch, series, parallel } = require('gulp');

// CSS Y SASS
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');

// IMAGENES
const imagemin = require('gulp-imagemin');

function css(done) {
    // compilar sass
    // pasos| 1 - identificar archivo, 2 - compilar, 3 - guardarla en .css
    src('src/scss/app.scss')
        .pipe(sass())
        .pipe(postcss([ autoprefixer() ]))
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

// Posible error: npm install --save-dev gulp-imagemin@7.1.0

exports.css = css;
exports.watch = dev;
exports.default = series(imagenes, css, dev);
exports.imagenes = imagenes;

// series - Se inicia una tarea y hasta que finaliza, inicia la siguiente.
// parallel - Todas las tareas inician al mismo tiempo.

const { series, src, dest, watch, parallel } = require('gulp');
//dest--> ubicacion donde se guardara
const sass = require('gulp-dart-sass');
const imagemin = require('gulp-imagemin');
const notify = require('gulp-notify');
const webp = require('gulp-webp');
const concact = require('gulp-concat');

//utilidades css
const autoprefixer = require('autoprefixer');
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const sourcemaps = require('gulp-sourcemaps');

//utilidades js
const terser = require('gulp-terser-js');
const rename = require('gulp-rename');

const paths ={
    imagenes: 'src/img/**/*',
    scss: 'src/scss/**/*.scss',
    js: 'src/js/**/*.js'
}

//Funcion que compila SASS

function css( ) {
    return src(paths.scss)
        .pipe( sourcemaps.init() )
        .pipe( sass() )
        .pipe( postcss( [autoprefixer(), cssnano()] ) )
        .pipe( sourcemaps.write('.') )
        .pipe( dest('./build/css') )
}

function javascript(params) {
    return src(paths.js)
        .pipe( sourcemaps.init() )
        .pipe( concact('bundle.js') )
        .pipe( terser() )
        .pipe( sourcemaps.write('.') )
        .pipe( rename({ suffix: '.min' }) )
        .pipe( dest('./build/js') )
}

function imagenes() {
    return src(paths.imagenes)
        .pipe( imagemin() )
        .pipe( dest( './build/img' ) )
        .pipe( notify( {message: 'Imagen Minificada'} ) );
}
function watchArchivo() {
    watch( paths.scss, css );//* la carpeta actual -- ** todos los archivos con la extension
    watch( paths.js, javascript );
}
function versionWebp() {
    return src(paths.imagenes)
        .pipe( webp() )
        .pipe( dest( './build/img') )
        .pipe( notify( {message: 'Versión webP lista'} ) );
}

exports.css = css;//compilador del sass al css

exports.imagenes = imagenes;
exports.watchArchivo = watchArchivo;//compilador automatico

exports.default = series( css, javascript, imagenes, versionWebp, watchArchivo );


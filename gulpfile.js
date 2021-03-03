const { series, src, dest, watch, parallel } = require('gulp');
//dest--> ubicacion donde se guardara
const sass = require('gulp-dart-sass');
const imagemin = require('gulp-imagemin');
const notify = require('gulp-notify');
const webp = require('gulp-webp');

const paths ={
    imagenes: 'src/img/**/*',
    scss: 'src/scss/**/*.scss'
}

//Funcion que compila SASS

function css( ) {
    return src(paths.scss)
        .pipe( sass() )
        .pipe( dest('./build/css') )
}
function minificarcss() {
    return src(paths.scss)
        .pipe( sass({
            outputStyle: 'compressed'
        }) )
        .pipe( dest('./build/css') )
}
function imagenes() {
    return src(paths.imagenes)
        .pipe( imagemin() )
        .pipe( dest( './build/img' ) )
        .pipe( notify( {message: 'Imagen Minificada'} ) );
}
function watchArchivo() {
    watch( paths.scss, css )//* la carpeta actual -- ** todos los archivos con la extension
}
function versionWebp() {
    return src(paths.imagenes)
        .pipe( webp() )
        .pipe( dest( './build/img') )
        .pipe( notify( {message: 'Versión webP lista'} ) );
}

exports.css = css;//compilador del sass al css
exports.minificarcss = minificarcss;//minificador
exports.imagenes = imagenes;
exports.watchArchivo = watchArchivo;//compilador automatico

exports.default = series( css, imagenes, versionWebp, watchArchivo );


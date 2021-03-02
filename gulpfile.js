const { series, src, dest, watch } = require('gulp');
//dest--> ubicacion donde se guardara
const sass = require('gulp-dart-sass');
const imagemin = require('gulp-imagemin');

//Funcion que compila SASS

function css( ) {
    return src('src/scss/app.scss')
        .pipe( sass() )
        .pipe( dest('./build/css') )
}
function minificarcss() {
    return src('src/scss/app.scss')
        .pipe( sass({
            outputStyle: 'compressed'
        }) )
        .pipe( dest('./build/css') )
}
function imagenes() {
    return src('src/img/**/*')
        .pipe( imagemin() )
        .pipe( dest( './build/img' ) )
}
function watchArchivo() {
    watch( 'src/scss/**/*.scss', css )//* la carpeta actual -- ** todos los archivos con la extension
}

exports.css = css;//compilador del sass al css
exports.minificarcss = minificarcss;//minificador
exports.imagenes = imagenes;
exports.watchArchivo = watchArchivo;//compilador automatico



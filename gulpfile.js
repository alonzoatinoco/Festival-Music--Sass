const { series } = require('gulp');

function css(done){
    console.log('Compilando.... SASS');
    done();
}
function js(done){
    console.log('Compilando en JavaScript');
    done();
}

exports.css = css;
exports.js = js;
exports.default = series(css, js);//por defecto se ejecutara



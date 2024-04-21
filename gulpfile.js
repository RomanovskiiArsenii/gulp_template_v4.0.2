//подключаем gulp
const { src, dest, watch, parallel, series } = require('gulp');
// подключаем обработку scss и sass
const scss = require('gulp-sass')(require('sass'));
// подключаем объединение файлов
const concat = require('gulp-concat');
// подключаем сжатие js
const uglify = require('gulp-uglify-es').default;
//подключаем синхронизацию с браузером
const browserSync = require('browser-sync').create();
// подключаем автопрефиксы css
const autoprefixer = require('autoprefixer');
const postcss = require('gulp-postcss');
//подключаем удаление старого билда перед новым
const clean = require('gulp-clean');
//подключаем плагины для конвертации и сжатия изображений
const avif = require('gulp-avif');
const webp = require('gulp-webp');
const imagemin = require('gulp-imagemin');
//подключаем плагин, который будет помогать конвертации изображений
//будут выбираться только те, которые еще не были конвертированы
const newer = require('gulp-newer');
//подключаем плагин для оптимизации SVG и конвертации в спрайт
const svgSprite = require('gulp-svg-sprite');
//подключаем конвертеры шрифтов
const fonter = require('gulp-fonter');
const ttf2woff2 = require('gulp-ttf2woff2');
// подключаем плагин для исключения файлов из потока
const ignore = require('gulp-ignore');

function fonts() {
    //выбрать все шрифты
    return src('app/fonts/src/*.*')
        .pipe(
            fonter({
                formats: ['woff', 'ttf'], //конвертация в woff и ttf
            })
        )
        .pipe(src('app/fonts/*.ttf')) //выбор ttf
        .pipe(ttf2woff2()) //конвертация в woff2
        .pipe(dest('app/fonts')); //выложить в fonts
}

function sprite() {
    return src('app/images/src/*.svg') //выбрать файлы svg
        .pipe(
            svgSprite({
                mode: {
                    stack: {
                        sprite: '../sprite.svg', //конвертировать в спрайт
                        example: true,
                    },
                },
            })
        )
        .pipe(dest('app/images')); //сохранить
}

function images() {
    return src(['app/images/src/*.*', '!app/images/src/*.svg']) //выбрать изображения, исключив svg
        .pipe(newer('app/images')) //выбрать только новые изображения
        .pipe(ignore.exclude('**/*.svg'))
        .pipe(avif({ quality: 50 })) //конвертировать в avif

        .pipe(src('app/images/src/*.*')) //исключение svg происходит автоматически
        .pipe(newer('app/images')) //выбрать только новые изображения
        .pipe(webp()) //конвертировать в webp

        .pipe(src('app/images/src/*.*')) //выбрать изображения, исключив svg
        .pipe(newer('app/images')) //выбрать только новые изображения
        .pipe(ignore.exclude('**/*.svg'))
        .pipe(imagemin({ verbose: true })) //сжать изображения, логгировать

        .pipe(dest('app/images')); //сохранить изображения в директории
}

function scripts() {
    //файлы js объединить, сжать, сохранить, обновить страницу
    return src('app/js/main.js') //файл js
        .pipe(concat('main.min.js')) //объединение файлов
        .pipe(uglify()) //сжать
        .pipe(dest('app/js')) //сохранить в файл
        .pipe(browserSync.stream()); //обновить страницу
}

function styles() {
    //расставить автопрефиксы, файлы SCSS конвертировать в CSS, сжать, объединить, сохранить, обновить страницу
    return src('app/scss/style.scss') //файл scss - источник
        .pipe(postcss([autoprefixer({ overrideBrowserslist: ['last 10 version'] })])) // Использование postcss с autoprefixer
        .pipe(scss({ outputStyle: 'compressed' })) //конвертировать в css и сжать
        .pipe(concat('style.min.css')) //объединение файлов
        .pipe(dest('app/css')) //сохранить в файл
        .pipe(browserSync.stream()); //обновить страницу
}

function watching() {
    //отслеживать изменения и синхронизировать со страницей в браузере при изменении файлов
    //подключение плагина
    browserSync.init({
        server: {
            baseDir: 'app/', //корневой каталог
        },
    });
    watch(['app/scss/style.scss'], styles); //вызов функции browsersync при изменении файла scss
    watch(['app/js/main.js'], scripts); //вызов функции browsersync при изменении файла js
    watch(['app/images/src'], images); //вызов функции images при изменении содержимого папки images/src
    watch(['app/fonts/src'], fonts); //вызов функции fonts при изменении содержимого папки fonts/src
    watch(['app/*.html']).on('change', browserSync.reload); //вызов функции browsersync при изменении любого html
}

function cleanDist() {
    //очистить директорию с билдом
    return src('dist').pipe(clean());
}

function building() {
    //собираем все файлы в конечную сборку, base - файловая структура как в паке app
    return src(
        [
            'app/css/style.min.css',
            'app/images/*.*',
            '!app/images/*.svg',
            'app/images/sprite.svg',
            'app/fonts/*.*',
            'app/js/main.min.js',
            'app/**/*.html',
        ],
        {
            base: 'app',
            allowEmpty: true, // Разрешаем пустые результаты
        }
    ).pipe(dest('dist'));
}

exports.styles = styles;
exports.scripts = scripts;
exports.watching = watching;
exports.images = images;
exports.sprite = sprite;
exports.fonts = fonts;
exports.cleanDist = cleanDist;
exports.building = building;

//series - последовательное выполнение задач
//parallel - параллельное выполнение задач

exports.convert = parallel(images, sprite, fonts); //конвертировать
exports.build = series(cleanDist, building); //собрать
exports.default = parallel(styles, scripts, watching); //по умолчанию

# gulp_template_2024

Сборка GULP 2024.

Установка:

$ npm init (enter до вопроса "is this ok?" отвечаем y)
$ npm i gulp-cli -g (глобально, если не установлен)
$ npm install gulp@4.0.2 --save-dev

-   В корневом каталоге создаем папки app и dist
    $ npm i gulp-sass@5.1.0 sass@1.58.3 -D
    $ npm i gulp-concat@2.6.1 -D
    $ npm i gulp-uglify-es@3.0.0 -D
    $ npm i browser-sync@2.28.1 -D
    $ npm i gulp-autoprefixer@8.0.0 -D
    $ npm i gulp-postcss -D
    $ npm i gulp-clean@0.4.0 -D
    $ npm i gulp-avif@1.1.1 gulp-webp@4.0.1 gulp-imagemin@7.1.0 --save-dev
    $ npm i gulp-newer@1.4.0 --save-dev
    $ npm install --save-dev gulp-svg-sprite@2.0.3
    $ npm install gulp-ignore@3.0.0 --save-dev

Включает в себя:

-   gulp-sass и sass (обработка scss / sass)
-   gulp-concat (объединение файлов)
-   gulp-uglify-es (сжатие js файлов)
-   browser-sync (синхронизация браузера)
-   наблюдение изменений css, js, html, изображенийб шрифтов
-   autoprefixer и gulp-postcss (автонаписание префиксов)
-   gulp-clean (очистка директории перед билдом)
-   gulp-avif gulp-webp gulp-imagemin (конвертация и сжатие изображений)
-   gulp-newer (для конвертации только новых изображений и избежания дублирования работы)
-   gulp-svg-sprite (плагин для оптимизации SVG и конвертации в спрайт)
-   fonter и ttf2woff2 (конвертация шрифтов в woff и woff2)
-   gulp-ignore (исключение файлов из потока)
-   билд

Команды:
gulp styles - конвертация scss в css
gulp scripts - объединение и сжатие скриптов
gulp watching - наблюдатель изменений
gulp images - конвертация изображений в webp avif и сжатие
gulp sprite - конвертация scg файлов в sprite
gulp fonts - конвертация шрифтов в woff / woff2
gulp building - билд чистового варианта приложения
gulp build - билд чистового варианта приложения с предварительной очисткой директории
gulp cleanDist - удалить папку dist (для билда ее потребуется создать вручную заново)
gulp convert - конвертация изображений и шрифтов
gulp - конвертация стилей, скриптов, запуск наблюдателя

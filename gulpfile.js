const build_project = 'build';   
const source_project = 'src';

const path = {
    build: {
        html: build_project +"/",
        css: build_project + "/css/",
        js: build_project + "/js/",
        img: build_project + "/img/",
        fonts: build_project + "/fonts/",
    },
    src: {
        html: [source_project + "/index.html"],
        css: source_project + "/scss/style.scss",
        js: source_project + "/js/script.js",
        img: source_project + "/img/**/*.{}",
        fonts: source_project + "/fonts/",
    },
    watch: {
        html: source_project + "/**/*.html",
        css: source_project + "/scss/**/*.scss",
        js: source_project + "/js/script.js",
        img: source_project + "/img/**/*.{jpg,png,svg,gif,ico,wedp}",
        
    },
    clean: './build'
};

let {src, dest} = require('gulp');
    gulp = require('gulp');
    fileinclude = require('gulp-file-include');
    browsersync = require('browser-sync').create();
    fileinclude = require('gulp-file-include');
    del = require('del');

function browserSync(params) {
    browsersync.init({
        server: {
            baseDir: "./build"
        },
        open: false,
        tunnel: true,
        host: 'localhost',
        port: 9000,
        logPrefix: "Sergey"
    })
}

function html(){
    return src(path.src.html)
    .pipe(fileinclude())
    .pipe(dest(path.build.html))
    .pipe(browsersync.stream())
}

function watchFiles() {
    gulp.watch([path.watch.html], html)
}

async function clean(params) {
    const deletedFilePaths = await del(['./build/*.*']);
}

const build = gulp.series(clean, html);
const watch = gulp.parallel(build, watchFiles, browserSync);

exports.html = html;
exports.build = build;
exports.watch = watch;
exports.default = watch;
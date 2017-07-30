var gulp = require('gulp');
var del = require('del');
var yaml = require('gulp-yaml');
var concat_json = require("gulp-concat-json");
var change = require('gulp-change');
var es = require('event-stream');

function reducePromises(promises = [], thenCallback = function (x) { return x }) {
    return promises.reduce(function reducer(chain, promise) {
        return chain.then(thenCallback(promise));
    }, Promise.resolve());
}

function runSyncTasksSequentially(tasks = []) {
    return reducePromises(tasks, function thenCallbackWrapper(promise) {
        return function thenCallback() {
            return promise();
        };
    });
}

function runAsyncTasksSequentially(tasks = []) {
    return reducePromises(tasks, function thenCallbackWrapper(promise) {
        return function thenCallback() {
            return promise;
        };
    });
}

gulp.task('conf', function() {

    runAsyncTasksSequentially([
        'i18n',
        'conf',
    ].map(generateDoc))
    .then(() => {
        console.log('Configutation is done');
    })
    .catch(() => {
        console.log('Configuation failed');
    });

    function performChange(content) {
        return 'var content = ' + content + ';';
    }

    function parseImports(content) {
        var oldLines = content.toString('utf8').split('\n');
        var newLines = [];
        var importKeyword = 'import';
        var importRawKeyword = 'import-raw';
        var regex = new RegExp("^(\\s+|)(\\w+):\\s(!(" + importKeyword + "|" + importRawKeyword + ")\\s+?(.*)(\\.ya?ml|\\.json)?)?\\s*$");
        for (var i = 0; i < oldLines.length; i++) {
            var line = oldLines[i];
            var match = line.match(regex);
            if (!match) {
                newLines.push(line);
            } else {
                var fileName = match[3].substr(match[3].lastIndexOf('/')+1);
                var fileNameArray = fileName.split('.');
                newLines.push(line.replace(match[3], '"[!' + fileNameArray[0] + '!]"'));
            }
        }

        return new Buffer(newLines.join('\n'));
    }

    function contentTransformation() {
        function transform(file, cb) {
            file.contents = parseImports(file.contents);
            cb(null, file);
        }

        return es.map(transform);
    }

    function generateJSONFile(tempPath, domainName) {
        return function () {
            return new Promise(function (resolve, reject) {
                gulp
                    .src([
                        './configuration/' + domainName + '/*.yml',
                        './components/**/' + domainName + '.yml'
                    ])
                    .pipe(contentTransformation())
                    .pipe(yaml())
                    .pipe(concat_json('conf.js'))
                    .pipe(gulp.dest(tempPath))
                    .on('end', resolve)
                    .on('error', reject);
            });
        };
    }

    function generateJSFile(tempPath, path) {
        return function () {
            return new Promise(function (resolve, reject) {
                gulp
                    .src([tempPath + 'conf.js'])
                    .pipe(change(performChange))
                    .pipe(gulp.dest(path))
                    .on('end', resolve)
                    .on('error', reject);
            });
        };
    }

    function clean(tempPath) {
        return function () {
            return new Promise(function (resolve, reject) {
                del([
                    tempPath
                ])
                .then(resolve)
                .catch(reject);
            });
        };
    }

    function getDiffinSeconds(startDate, endDate) {
        return (endDate.getTime() - startDate.getTime()) / 1000;
    }

    function generateDoc(domainName) {
        var startDate = new Date();
        var domainNamePath = './docs/' + domainName + '/';
        var domainNameTempPath = domainNamePath + 'temp/';

        return runSyncTasksSequentially([
            generateJSONFile(domainNameTempPath, domainName),
            generateJSFile(domainNameTempPath, domainNamePath),
            clean(domainNameTempPath)
        ]).then(function () {
            var endDate = new Date();
            console.log('* ' + domainName + ' is done in ' + getDiffinSeconds(startDate, endDate) + ' seconds');
        }).catch(function (e) {
            console.log('generateDoc', e);
        });
    }
});

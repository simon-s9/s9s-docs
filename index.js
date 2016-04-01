'use strict';

const jsdox = require('jsdox');
const Promise = require('promise');

exports = module.exports = {

    /**
     * Generate documentation for path and store it into output path
     * @param {string} path Path to process
     * @param {string} output Path to output the docs
     * @returns {Promise}
     */
    generate: function (path, output) {
        return new Promise(function (resolve, reject) {
            jsdox.generateForDir(path, output, __dirname + '/templates',
                function (error) {
                    if (error) {
                        return reject.apply({}, arguments);
                    }
                    return resolve.apply({}, arguments);
                },
                function () {
                }
            );

        });
    }

};
'use strict';

const jsdox = require('s9s-jsdox');
const Promise = require('promise');

exports = module.exports = {

    /**
     * Generate documentation for path and store it into output path
     * @param {Object} options Options object
     * @returns {Promise}
     */
    generate: function (options) {
        return new Promise(function (resolve, reject) {
            jsdox.generateForDir(options.input, options.output, __dirname + '/templates',
                function (error) {
                    if (error) {
                        return reject.apply({}, arguments);
                    }
                    return resolve.apply({}, arguments);
                },
                function () {
                },
                options,
                options.index
            );
        });
    }

};
#!/usr/bin/env node

'use strict';

const cli = require('cli');
const docs = require(__dirname + '/index');
const filesystem = require('s9s-filesystem');
const path = require('path');

/**
 * Application package (package.json)
 * @type {{}}
 */
const pkg = filesystem.readJson(__dirname + '/package.json');

cli.setApp(pkg.name, pkg.version);
cli
    .enable('version')
    .enable('status');

cli.parse({
    input: ['i', 'Javascript files to scan', 'file'],
    output: ['o', 'Path to output the generated docs', 'file'],
    recursive: ['r', 'Recursive mode'],
    index: [null, 'Generate index file', 'string']
});

cli.main(function (args, options) {
    if (!options.input) {
        cli.info('Input path is not specified, using "src"');
        options.input = './src';
    }
    if (!options.output) {
        cli.info('Output path is not specified, using "docs"');
        options.output = './docs';
    }
    if (!filesystem.isDirectory(options.output)) {
        filesystem.createDirectory(options.output);
    }

    options.recursive = options.recursive === true;
    options.rr = options.recursive === true;

    if (typeof(options.index) !== 'string') {
        options.index = options.index === true;
    }

    var msg = 'Generating docs for ' + options.input + ' ...';

    cli.spinner(msg);
    docs.generate(options)
        .then(function () {
            cli.spinner(msg + ' DONE!', true);
        })
        .catch(function (error) {
            cli.spinner(msg + ' FAILED!', true);
            cli.error(error.message);
        });
});
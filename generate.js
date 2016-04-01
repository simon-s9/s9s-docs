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
cli.enable('version');

cli.parse({
    input: ['i', 'Javascript files to scan', 'file'],
    output: ['o', 'Path to output the generated docs', 'file']
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

    options.input = path.resolve(options.input);
    options.output = path.resolve(options.output);

    docs.generate(options.input, options.output)
        .then(function () {
            cli.info('The docs were generated and saved to ' + options.output);
        })
        .catch(function (error) {
            cli.error(error.message);
        });
});
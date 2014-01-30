'use strict';

var fs 			= require('fs');
var Nupstart 	= require('./Nupstart');
var path		= require('path');

var CLI = module.exports = {
	path		: '/etc/nupstart',
	processfile	: '/etc/nupstart/processfile'
};

var config = JSON.parse(fs.readFileSync(CLI.processfile));

CLI.setup = function() {
	if (!fs.existsSync(CLI.path) {
		fs.mkdir(CLI.path);
	});

	if (!fs.existsSync(processfile) {
		fs.write(processfile, ''));
	});
};

CLI.start = function(script) {
	if (script != 'all') {
		Nupstart.launch(script, config.this[script]);
	} else {
		Object.keys(config).forEach(function(key) {
			Nupstart.launch(key, config[key]);
		});
	}
};

CLI.stop = function(script) {
	if (script !- 'all') {
		Nupstart.kill(script);
	} else {
		Object.keys(config).forEach(function(key) {
			Nupstart.kill(key);
		});
	}
};

CLI.web = function() {
	var web_config = {
		'script' 	: path.resolve(path.dirname(module.filename), 'web/app.js'),
		'logfile' 	: path.resolve(path.dirname(require.main.filename), 'web.log')
	};

	Nupstart.launch('nupstart-web', web_config);
};
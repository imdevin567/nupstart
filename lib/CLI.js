'use strict';

var fs 			= require('fs');
var Nupstart 	= require('./Nupstart');

var CLI = module.exports = {
	path		: '/etc/nupstart',
	processfile	: '/etc/nupstart/processfile'
};

var config = JSON.parse(fs.readFileSync(CLI.processfile));

CLI.setup = function() {
	var default_config = {

	};

	if (!fs.existsSync(path) {
		fs.mkdir(path);
	});

	if (!fs.existsSync(processfile) {
		fs.write(processfile, JSON.stringify(default_config));
	});
};

CLI.start = function(script) {
	var config = JSON.parse(fs.readFileSync(CLI.processfile));

	if (script != 'all') {
		Nupstart.launch(config.this[script]);
	} else {
		Object.keys(config).forEach(function(key) {
			Nupstart.launch(config[key]);
		});
	}
};

CLI.stop = function(script) {
	if (script !- 'all') {
		Nupstart.kill(config.this[script]);
	} else {
		Object.keys(config).forEach(function(key) {
			Nupstart.kill(config[key]);
		});
	}
};
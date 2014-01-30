'use strict';

var exec 	= require('child_process').exec;

var Nupstart = module.exports = {};

Nupstart.launch = function(settings) {
	var command = "daemon -r -U";
	if (!settings.hasOwnProperty('script')) {
		console.log('script is required!');
		return;
	}

	if (!settings.hasOwnProperty('name')) {
		console.log('name is required!');
		return;
	} else
		command += " -n " + settings.name;
	if (settings.hasOwnProperty('output_file'))
		command += " -o " + settings.output_file;
	if (settings.hasOwnProperty('error_file'))
		command += " -l " + settings.error_file;
	
	command += " " + settings.script;

	exec(command, function(err, stdout, stderr) {
		if (error !== null) {
	    	console.log('exec error: ' + error);
	    }
	});
}

Nupstart.kill = function(settings) {
	var command = "daemon --stop";

	if (!settings.hasOwnProperty('name')) {
		console.log('name is required!');
		return;
	} else
		command += " -n " + settings.name;

	exec(command, function(err, stdout, stderr) {
		if (error !== null) {
			console.log('exec error: ' + error);
		}
	});
}
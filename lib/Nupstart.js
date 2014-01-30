'use strict';

var exec 	= require('child_process').exec;
var fs		= require('fs');
var os 		= require('os');

var Nupstart = module.exports = {};

Nupstart.launch = function(name, settings) {
	var eol = 'win32' == os.platform() ? '\r\n' : '\n';

	if (!fs.existsSync('/etc/init/' + name + '.conf')) {
		console.log('Creating Upstart script...');
		
		var runnable = 'exec ' + process.execPath;
		if (!settings.hasOwnProperty(script)) {
			console.log('script is required!');
			return;
		} else {
			runnable += ' ' + settings.script;
		}

		if (settings.hasOwnProperty(logfile))
			runnable += ' >> ' + settings.logfile;

		runnable += ' 2>&1';

		var upstart = [
			'description 	' + name
			, ''
			, 'stop on shutdown'
			, 'respawn'
			, 'respawn limit 99 5'
			, ''
			, 'script'
			, runnable
			, 'end script'
		].join(eol);

		fs.writeFile('/etc/init/' + name + '.conf', upstart);
	} else {
		console.log('Upstart script already created.');
	}

	exec('start ' + name, function(err, stdout, stderr) {
		if (error !== null) {
	    	console.log('exec error: ' + error);
	    }
	});
}

Nupstart.kill = function(name) {
	exec('stop ' + name, function(err, stdout, stderr) {
		if (error !== null) {
			console.log('exec error: ' + error);
		}
	});
}
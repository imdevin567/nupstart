'use strict';

var exec 	= require('child_process').exec;
var fs		= require('fs');
var os 		= require('os');

var Nupstart = module.exports = {};

Nupstart.execute = function(cmd) {
	exec(cmd, function(err, stdout, stderr) {
		if (err !== null) {
	    	console.log(err);
	    } else {
	    	console.log(stdout);
	    }
	});
};

Nupstart.launch = function(name, settings) {
	var eol = 'win32' == os.platform() ? '\r\n' : '\n';

	if (!fs.existsSync('/etc/init/' + name + '.conf')) {
		var runnable = 'exec ' + process.execPath;

		if (!settings.hasOwnProperty('script')) {
			console.log('script is required!');
			return;
		} else {
			runnable += ' ' + settings.script;
		}

		if (settings.hasOwnProperty('logfile'))
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

		fs.writeFile('/etc/init/' + name + '.conf', upstart, function(err) {
			if (err !== null) {
				console.log('exec error: ' + err);
			} else {
				console.log('Upstart script created for ' + name);
			}

			Nupstart.execute('start ' + name);
		});
	} else {
		console.log('Upstart script already created for ' + name + '. Moving on.');
		Nupstart.execute('start ' + name);
	}
};

Nupstart.kill = function(name) {
	Nupstart.execute('stop ' + name);
};

Nupstart.clean = function(name) {
	if (fs.existsSync('/etc/init/' + name + '.conf')) {
		fs.unlink('/etc/init/' + name + '.conf', function(err) {
			if (err !== null) {
				console.log('exec error: ' + err);
			} else {
				console.log('Removed Upstart script for ' + name);
			}
		});
	}
};
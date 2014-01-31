'use strict';

var exec 	= require('child_process').exec;
var fs		= require('fs');
var os 		= require('os');
var PM 		= require('./ProcessMonitor');

var Nupstart = module.exports = {};

Nupstart.execute = function(cmd, error, success) {
	exec(cmd, function(err, stdout, stderr) {
		if (err !== null) error(err);
	    else success(stdout);
	});
};

Nupstart.launch = function(name, settings) {
	var eol = 'win32' == os.platform() ? '\r\n' : '\n';

	if (!fs.existsSync('/etc/init/' + name + '.conf')) {
		var autostart = "";

		if (settings.hasOwnProperty('start_on_boot') && settings.start_on_boot)
			autostart = "start on started mountall";

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
			"description 	" + name
			, ""
			, autostart
			, "stop on shutdown"
			, "respawn"
			, "respawn limit 99 5"
			, ""
			, "script"
			, runnable
			, "end script"
			, ""
			, "post-start script"
			, 	"PID=`status " + name + " | egrep -oi '([0-9]+)$' | head -n1`"
			,	"echo $PID > /var/run/" + name + ".pid"
			, "end script"
			, ""
			, "post-stop script"
			, 	"rm -f /var/run/" + name + ".pid"
			, "end script"
		].join(eol);

		fs.writeFile('/etc/init/' + name + '.conf', upstart, function(err) {
			if (err !== null) {
				console.log('exec error: ' + err);
			} else {
				console.log('Upstart script created for ' + name);
			}

			Nupstart.execute('start ' + name, function(err) {
				console.log('exec error: ' + err);
			}, function(stdout) {
				console.log(stdout);
			});
		});
	} else {
		console.log('Upstart script already created for ' + name + '. Moving on.');
		Nupstart.execute('start ' + name, function(err) {
			console.log('exec error: ' + err);
		}, function(stdout) {
			console.log(stdout);
		});
	}
};

Nupstart.kill = function(name) {
	Nupstart.execute('stop ' + name, function(err) {
		console.log('exec error: ' + err);
	}, function(stdout) {
		console.log(stdout);
	});
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

Nupstart.stats = function(name) {
	PM.top(name, function(stats) {
		console.log(JSON.stringify(stats));
	});
};

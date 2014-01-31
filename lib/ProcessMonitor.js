'use strict';

var exec 	= require('child_process').exec;
var os 		= require('os');
var fs		= require('fs');

var ProcessMonitor = module.exports = {};

ProcessMonitor.execute = function(cmd, error, success) {
	exec(cmd, function(err, stdout, stderr) {
		if (err !== null) {
	    	error(err);
	    } else {
	    	success(stdout);
	    }
	});
};

ProcessMonitor.getPID = function(name) {
	return fs.readFileSync('/var/run/' + name + '.pid', 'utf8');
};

ProcessMonitor.top = function(name, callback) {
	var rawpid = ProcessMonitor.getPID(name);
	var pid = rawpid.replace(/(\r\n|\n|\r)/gm,"");
	var command = "top -bn1 -p " + pid + " | grep '^ " + pid + "'";

	ProcessMonitor.execute(command, function(err) {
		console.log('exec error: ' + err);
	}, function(stdout) {
		var top_stats_array = stdout.split(/[ ]+/);
		var top_stats = {};
		top_stats[name] = {
			pid 		: top_stats_array[1],
			user		: top_stats_array[2],
			priority	: top_stats_array[3],
			nice		: top_stats_array[4],
			memory		: top_stats_array[6].replace('m',''),
			cpu_pct		: top_stats_array[9],
			memory_pct	: top_stats_array[10],
			uptime		: top_stats_array[11]
		};

		callback(top_stats);
	});
};
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
	return fs.readFileSync('/var/run/' + name + '.pid');
};

ProcessMonitor.top = function(name) {
	var pid = ProcessMonitor.getPID(name);
	var command = "top -bn1 -p " + pid + " | grep '^ " + pid + "'";

	ProcessMonitor.execute(command, function(err) {
		console.log('exec error: ' + err);
	}, function(stdout) {
		var top_stats_array = stdout.split(/[ ]+/);
		var top_stats = {
			pid 		: top_stats_array[0],
			user		: top_stats_array[1],
			priority	: top_stats_array[2],
			nice		: top_stats_array[3],
			memory		: top_stats_array[5],
			cpu_pct		: top_stats_array[8],
			memory_pct	: top_stats_array[9],
			uptime		: top_stats_array[10]
		};

		return top_stats;
	});
};
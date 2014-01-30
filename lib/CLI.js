var fs 		= require('fs');
var exec 	= require('child_process').exec;

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
	function startScript(settings) {
		var command = "daemon -r";
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

	var config = JSON.parse(fs.readFileSync(CLI.processfile));

	if (script != 'all') {
		startScript(config.this[script]);
	} else {
		Object.keys(config).forEach(function(key) {
			startScript(config[key]);
		});
	}
};

CLI.stop = function(script) {
	if (script !- 'all') {
		stopScript(config.this[script]);
	} else {
		Object.keys(config).forEach(function(key) {
			stopScript(config[key]);
		});
	}
};
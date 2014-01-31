nupstart
========

Upstart for Node.js

Features
========
- Leverages existing Linux utilities
- Creates and runs Upstart scripts for Node.js applications to run them as daemons in the background
- Command-line interface to manage apps with a simple JSON config file
- Simple API to manage apps programmatically
 

TODO
=====
- API and CLI to monitor processes
- Web interface to monitor and launch applications

### Node Dependencies
- Commander 2.1.0

[![Build Status](https://david-dm.org/imdevin567/nupstart.png)](https://david-dm.org/imdevin567/nupstart)

### Build Status

Master : [![Build Status](https://api.travis-ci.org/imdevin567/nupstart.png?branch=master)](https://travis-ci.org/imdevin567/nupstart)

# Usage/Features

processfile
----------
Nupstart CLI depends on a JSON config file located at /etc/nupstart/processfile. This file is created initially after running `nupstart setup` and should be edited to reflect the apps you wish to manage with nupstart. The format is simple:

```json
{
    "myappname" : {
    	"script" 	: "/var/www/myappname/app.js",
		"logfile" 	: "/var/log/myappname-nupstart.log"
	},
	"myotherapp" : {
		"script"	: "/var/www/myotherapp/main.js",
		"logfile"	: "/var/log/venus/myotherapp-nupstart.log"
	}
}
```
Name and "script" are required. The "logfile" parameter is optional. 

You can then start "myappname" as a daemon by running `nupstart start myappname`. Or, start all apps by running `nupstart start all`.

CLI Usage
----------
```bash
$ npm install https://github.com/imdevin567/nupstart/tarball/master -g     # Install nupstart globally

$ nupstart setup        # Run this after install to setup needed files and directories

$ nupstart start app    # Create and run Upstart script for "app" specified in processfile

$ nupstart stop app     # Stop "app" specified in processfile

$ nupstart start all    # Creates and runs Upstart scripts for all apps specified in processfile

$ nupstart stop all     # Stops all apps specified in processfile

$ nupstart clean        # Stops all apps in processfile and removes existing Upstart scripts
```

License
-----
Nupstart is available through the MIT license.

Author
------
##### [Devin Young] (http://github.com/imdevin567)
------------

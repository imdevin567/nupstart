#!/usr/bin/env bash

source "`pwd`/test/Spec.sh"

echo -e "\033[1mRunning tests:\033[0m"


echo "####################### DEBUG ############################"
echo "Node command = " $node
echo "Nupstart Command = " $nupstart
echo "Node version = " $nodeVersion
$node -e "var os = require('os'); console.log('arch : %s\nplatform : %s\nrelease : %s\ntype : %s\nmem : %d', os.arch(), os.platform(), os.release(), os.type(), os.totalmem())"
echo "###################### !DEBUG! ###########################"

cd $file_path

# Test if 'nupstart setup' creates necessary files and directories
sudo $nupstart setup
OUT=$(ls /etc/nupstart 2> /dev/null | grep -o "processfile" | wc -l)
[ $OUT -eq 1 ] || fail "$1"
success "$1"

sudo rm -rf /etc/nupstart

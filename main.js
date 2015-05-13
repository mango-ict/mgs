#! /usr/local/bin/node

// Get the util
var util = require("util");

// Output CLI
console.log('Mango ICT - CLI');

// Done with CLI
function done(msg){
  console.log(msg);
  process.exit();
}
	
// Init Project
function initProject () {
  process.stdin.resume();
  process.stdin.setEncoding("utf8");
  process.stdin.on('data', function (text) {
    console.log('received data:', util.inspect(text));
    if (text === 'quit\n') {
      done('The project has been created');
    }
  });
}

// Process commandline arguments
process.argv.forEach(function (val, index, array) {
	switch (val) {
		case "--version":
			console.log("current version is 1.0.2"); 
			break;
		case "init":
			initProject();
			break;
	}
});

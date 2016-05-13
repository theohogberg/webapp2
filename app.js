'use strict';

// modules
var express = require('express');
var env = require('node-env-file');

// env variables
env(__dirname + '/.env');

// setup
var app = express();

// specify home
app.get('/', function (req, res) {
	res.header('Access-Control-Allow-Origin', '*'); // TODO: only localhost and site
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	res.sendFile('index.html', {root:'./'});
});

// serve static files
app.use('/public', express.static('public'));


// load router
var apirouter = require('./lib/api.js');
app.use('/api', apirouter);

// other
app.listen(process.env.PORT);
console.log('app started on port', process.env.PORT);

// dev
if ( /yes|true/i.test(process.env.DEV) ) {
	process.stdin.setRawMode(true);
	process.stdin.setEncoding('hex');
	process.stdin.on('data', function(keyhex){ 
		if (keyhex === '1b'/*esc*/) { 
			process.exit(0); 
		} 
	});
}

'use strict';

// modules
var express = require('express');
var env = require('node-env-file');
var bodyPareser = require('body-parser');
var cookieParser = require('cookie-parser');

// env variables
env(__dirname + '/.env');

// setup
var app = express();

// setup express mods
app.use(bodyPareser.json());
app.use(bodyPareser.urlencoded({ extended: true }));
app.use(cookieParser());
// serve static files
app.use('/public', express.static('public'));

// specify home
app.get('/', function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*'); // TODO: only localhost and site
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	res.sendFile('public/index.html', {root:'./'});	
});

app.get('/users/*', function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*'); // TODO: only localhost and site
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	res.sendFile('public/index.html', {root:'./'});	
});

// load router
var apirouter = require('./lib/api.js').router;
app.use('/api', apirouter);

// login
var login = require('./lib/api.js').login;
app.post('/login', function (req, res) {
	login(req.body.name).done(function(result) {
		if (result && result._id && result.name === req.body.name)
			res.cookie('auth', result._id.toHexString(), { expires: new Date(Date.now() + 900000) }).status(200).sendFile('public/index.html', {root:'./'});
		else
			res.clearCookie('auth').status(404).sendFile('public/index.html', {root:'./'});
	});
});

// other
app.listen(process.env.PORT);
console.log('app started on port', process.env.PORT);

// dev (press esc to quit)
if ( /yes|true/i.test(process.env.DEV) ) {
	process.stdin.setRawMode(true);
	process.stdin.setEncoding('hex');
	process.stdin.on('data', function(keyhex){ 
		if (keyhex === '1b'/*esc*/) { 
			process.exit(0); 
		} 
	});
}

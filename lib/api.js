'use strict';

// modules
var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
var Q = require('q');

// SETUP
var mclient = MongoClient.connect(process.env.DB_URL, {promiseLibrary:Q.Promise});
var router = require('express').Router();

// db functions
function getUserTweets(id){
	return mclient.then(function(db){
		return db.collection('tweets').find({ 'user' : id }).toArray();
	});
}
function getUserById(id){
	return mclient.then(function(db){
		return db.collection('users').findOne({ '_id' : id });
	});
}
function getUserByName(name){
	return mclient.then(function(db){
		return db.collection('users').findOne({ 'name' : name });
	});
}
function addUserTweet(id, text){
	return mclient.then(function(db){
		return db.collection('tweets').insert({
			'user' : id,
			'text' : text,
			'date' : new Date(),
			'likes' : []
		});
	});
}
// function addUser(name){
// 	return mclient.then(function(db){
// 		var cursor = db.collection('users').find({'name':name});
// 		console.log(cursor);
// 		// if (!exists)
// 			// return db.collection('users').insert({
// 				// 'name' : name,
// 				// 'followers' : [],
// 				// 'following' : [],
// 			// });
// 	});
// }
function updateFollower(user, follower){
	return mclient.then(function(db){
		return db.collection('users').update( { } );
	});
}
function updateLike(tweetid, liker){
	return mclient.then(function(db){
		return db.collection('tweets').update( { } );
	});
}
function login(name){
	return mclient.then(function(db){
		return db.collection('users').findOne({ 'name' : name  });
	});
}


// set params super simple auth
router.use(function(req, res, next) {
	var auth = req.cookies.auth
	// console.log('Auth', auth);
	console.log('API called');
	next();
});
router.param('quantity', function (req, res, next, quantity) {
	req.quantity = Math.abs(quantity);
	next();
});
router.param('id', function (req, res, next, id) {
	try {
		req.id = ObjectID(id)
	} catch (e){
		console.error('Id could not be converted to ObjectID!')
		return;
	}
	next();
});
router.param('actor', function (req, res, next, actor) {
	req.actor = actor;
	next();
});
router.param('text', function (req, res, next, text) {
	req.text = unescape(text);
	next();
});

// get user tweets
router.get('/tweets/:id', function (req, res, next) {
	getUserTweets(req.id).done(function(tweets){
		res.send(tweets); /* 200 */ 
	}, function (err){
		if (err)
				res.sendStatus(404);
	});
});

// get user by id
router.get('/users/:id', function (req, res, next) {
	getUserById(req.id).done(function(user){
		res.send(user); /* 200 */ 
	}, function (err){
		if (err)
				res.sendStatus(404);
	});
});

// get user by name
router.get('/users/:text', function (req, res, next) {
	getUserByName(req.text).done(function(user){
		res.send(user); /* 200 */ 
	}, function (err){
		if (err)
				res.sendStatus(404);
	});
});

// add user tweet
router.post('/tweets/:id/:text', function (req, res, next) {
	addUserTweet(req.id, req.text).then(function(result){
		res.send(result); /* 200 */ 
	}, function (err){
		if (err)
			res.sendStatus(404);
	});
});

// add user
router.post('/users/:text', function (req, res, next) {
	addUser(req.text).then(function(result){
		res.send(result); /* 200 */ 
	}, function (err){
		if (err)
			res.sendStatus(404);
	});
});

// update follower
router.put('/users/:id/:actor', function (req, res, next) {
	updateFollower(req.id, req.actor).then(function(result){
		res.send(result); /* 200 */ 
	}, function (err){
		if (err)
			res.sendStatus(404);
	});
});

// update like
router.put('/tweets/:id/:actor', function (req, res, next) {
	updateLike(req.id, req.actor).then(function(result){
		res.send(result); /* 200 */ 
	}, function (err){
		if (err)
			res.sendStatus(404);
	});
});

module.exports.router = router;
module.exports.login = login;
module.exports.getUserByName = getUserByName;
module.exports.getUserById = getUserById;
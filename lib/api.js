'use strict';

// modules
var model = require('./model.js');

// setup
var router = require('express').Router();
router.use(function(req, res, next) {
	console.log('API has been called');
	next();
});

// set quantity to update or get (100 maximum)
router.param('quantity', function (req, res, next, num) {
	req.quantity = Math.min(num, 100);
	next();
});

/* :params */
// set id to get or start from
router.param('id', function (req, res, next, id) {
	req.id = id;
	next();
});

/* URI tweets */
// get resources
router.get('/tweets/:quantity/:id', function (req, res, next) {
	model.getTweets(req.quantity).then(function(tweets){
		// 200
		res.send(tweets);
	}, function (err){
		if (err)
			;
		// 404
	});
});

// save quantity resources from id and forwards
router.post('/tweets/:quantity/:id', function (req, res, next) {
	model.olderTweets(req.quantity, req.id).then(function(tweets){
		// 200
		res.send(tweets);
	}, function (err){
		if (err)
			;
		// 404
	});
});

// save quantity resources from id and backwards
router.post('/tweets/:id', function (req, res, next) {
	model.newerTweets(req.id).then(function(tweets){
		// 200
		res.send(tweets);
	}, function (err){
		if (err)
			;
		// 404
	});
});

// update next quantity resources
// router.post('/tweets/:quantity/:id', function (req, res, next) {
	// console.log(req.quantity);
	// res.send(result)
// });

/* URI news */
// get resources
router.get('/news/:quantity', function (req, res, next) {
});

// get new quantity resources from id and forward
router.post('/news/:quantity/:id', function (req, res, next) {
});

// update next quantity resources
// router.post('/news/:quantity:/:id', function (req, res, next) {
	// console.log(req.quantity);
	// res.send(result)
// });


module.exports = router;
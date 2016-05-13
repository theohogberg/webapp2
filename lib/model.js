'use strict';

// modules
var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
var twitter = require('twitter');
var request = require('request');
var feedparser = require('feedparser');
var Q = require('q');	

// setup
var client = new twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});
var feedreq = request(process.env.FEEDPARSER_URL);
var fp = new feedparser();
var mongoclient = MongoClient.connect(process.env.DB_URL, {promiseLibrary:Q.Promise});

// get all tweets until target number
function getTweets(num, id){
	return mongoclient.then(function(db){
		var query;		
		if (Number.isInteger(id))
			query = {id:{$gt:id}};
		else 
			query = {};
	 	return db.collection('tweets').find(query).sort({id:-1}).limit(num).toArray();
	});
}

function olderTweets(num, idm){
	// var mongoclient = MongoClient.connect(process.env.DB_URL, {promiseLibrary:Q.Promise});
	var deferred = Q.defer();
	mongoclient.then(function(db){
		var query = {screen_name: process.env.TWITTER_ACCOUNT_NAME, count:num, max_id:idm, include_rts:1};
		client.get('statuses/user_timeline.json', query, function(err, statuses){
			if (err)
				deferred.reject(new Error('Invalid twitter api call'));
			db.collection('tweets').insert(statuses).then(function(r){
				deferred.resolved(r.ops);
			}, function(err){
				if (err)
					deferred.reject(new Error('Invalid database operation'));
			});
		});
	}, function(err){
		if (err)
			deferred.reject(new Error('Invalid database operation'));
	});
	return deferred;
}

function newerTweets(ids){
	// var mongoclient = MongoClient.connect(process.env.DB_URL, {promiseLibrary:Q.Promise});
	var deferred = Q.defer();
	mongoclient.then(function(db){
		var	query = {screen_name: process.env.TWITTER_ACCOUNT_NAME, since_id:ids, include_rts:1};
		client.get('statuses/user_timeline.json', query, function(err, statuses){
			if (err)
				deferred.reject(new Error('Invalid twitter api call'));
			db.collection('tweets').insert(statuses).then(function(r){
				deferred.resolved(r.ops);
			}, function(err){
				if (err)
					deferred.reject(new Error('Invalid database operation'));
			});
		});
	}, function(err){
		if (err)
			deferred.reject(new Error('Invalid database operation'));
	});
	return deferred;
}

exports.getTweets = getTweets;
exports.newerTweets = newerTweets;
exports.olderTweets = olderTweets;

var front = angular.module('front-app', ['ui.router'])
	.config(function config($stateProvider) {
		$stateProvider.state('news', { 
			url:'twitter', 
			controller:'NewsCtrl as news', 
			templateUrl:'/public/templates/news.html'
		});
		$stateProvider.state('twitter', { 
			url:'news', 
			controller:'TwitterCtrl as twitter', 
			templateUrl:'/public/templates/twitter.html'
		});
	})
	.controller('AppCtrl', function () {
		// var app = this;
		// app.greeting = 'Hello';
	})
	.controller('TwittwerCtrl', function ($scope, Data) {
		$scope.twitter = Data.twitter;
	})
	.controller('NewsCtrl', function ($scope, Data) {
		$scope.news = Data.news;
	});

front.factory('Data', function () {
	return ('Data from service');
});

// front.filter('newest', function (Data) {
	// return function (list) {
		// return list.sort(function(oa, ob){ return (ob.id - oa.id); });
	// };
// });



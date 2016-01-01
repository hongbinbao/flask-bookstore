angular.module("bookStore").config(config);

function config($routeProvider, $locationProvider) {
	$routeProvider
		.when('/', {
			templateUrl: 'template/bookListView.html',
			controller: 'BookController',
			controllerAs: "vm"
		})
		.when("/book/:bookId", {
			templateUrl: "template/bookDetailView.html",
			controller: "BookDetailController",
			controllerAs: "vm"
		})
		.when("/book/search/:bookTitle", {
			templateUrl: 'template/bookListView.html',
			controller: 'BookController',
			controllerAs: "vm"
		})
		.when("/category/:category", {
			templateUrl: 'template/bookListView.html',
			controller: 'BookController',
			controllerAs: "vm"
		})
		.otherwise({
			redirectTo: "/"
		});
}
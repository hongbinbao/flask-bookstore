angular.module("bookStore")
	.controller("BookDetailController", BookDetailController);

BookDetailController.$inject = ["$scope", "$routeParams", "bookService"];

function BookDetailController($scope, $routeParams, bookService) {
	var vm = this;
	vm.info = {};
	vm.qty = 1;
	
	bookService.get($routeParams.bookId).then(function(response) {
		// angular.merge(vm, response.data);
		vm.info = response.data;
		$scope.$emit("blurEffect:resetHeight", 0)
	});
}
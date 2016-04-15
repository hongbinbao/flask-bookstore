angular.module("bookStore")
	.controller("BookDetailController", BookDetailController);

BookDetailController.$inject = ["$scope", "$routeParams", "bookService", "cartService"];

function BookDetailController($scope, $routeParams, bookService, cartService) {
	var vm = this;
	vm.info = {};
	vm.qty = 1;

	bookService.get($routeParams.bookId)
		.then(response => {
			vm.info = response.data;
			$scope.$emit("blurEffect:resetHeight", 0);
		});

	vm.addToCart = () => cartService.addToCart(vm.info, vm.qty);
}
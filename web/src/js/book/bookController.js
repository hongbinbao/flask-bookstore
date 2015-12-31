angular.module("bookLibrary")
	.controller("BookController", BookController);

BookController.$inject = ["$scope", "$routeParams", "bookService", "categoryService"];

function BookController($scope, $routeParams, bookService, categoryService) {
	var vm = this;
	vm.books = [];
	vm.searchBox = $routeParams.bookTitle;
	// Scroll and loading new book
	var pageNum = 0;
	var isLoading = false;
	loadPage();
	function loadPage() {
		isLoading = true;
		var req;
		if ($routeParams.category)
			req = categoryService.getBooks(pageNum, $routeParams.category);
		else
			if ($routeParams.bookTitle)
				req = bookService.findBooks(pageNum, $routeParams.bookTitle);
			else req = bookService.getBooks(pageNum);
		req.then(function (response) {
			if (response.data.length > 0) {
				vm.books = vm.books.concat(response.data);
				// console.log(vm.books.length);
				pageNum++;
			}
			isLoading = false;
		});
	}
	var windowScrollEnd = $scope.$on("windowScrollEnd", function () {
		if (!isLoading) loadPage();
	});
	
	// Breadcrum
	if ($routeParams.category) loadBreadcrum();
	function loadBreadcrum() {
		categoryService.get($routeParams.category)
			.then(function (response) {
				vm.category = response.data;
			});
	}

	vm.searchBook = searchBook;
	function searchBook() {
		window.location.hash = "/book/search/" + vm.searchBox;
	}

	$scope.$on("$destroy", function () {
		windowScrollEnd();
	});
}
angular.module("bookStore")
	.controller("BookController", BookController);

BookController.$inject = ["$scope", "$routeParams", "bookService", "categoryService"];

function BookController($scope, $routeParams, bookService, categoryService) {
	var vm = this;
	vm.books = [];
	vm.searchBox = $routeParams.bookTitle;
	vm.searchBook = () => location.hash = `/book/search/${vm.searchBox}`;

	var eventHandler = [];
	
	// Scroll and loading new book
	var pageNum = 0;
	var isLoading = false;
	function loadBooks() {
		// Exit if there is a request or reach max number of books
		if (isLoading) return;
		else isLoading = true;

		var req = ($routeParams.category) ?
			categoryService.getBooks(pageNum, $routeParams.category) :
			bookService.loadBooks(pageNum, $routeParams.bookTitle);

		req.then(function (response) {
			if (response.data.length > 0) {
				vm.books = vm.books.concat(response.data);
				pageNum++;
				isLoading = false;
			}
		});
	}
	
	// Initialize
	(function init() {
		// Load breadcrum
		if ($routeParams.category)
			categoryService.get($routeParams.category)
				.then((response) => vm.category = response.data);
		
		loadBooks();
		eventHandler.push($scope.$on("windowScrollEnd", loadBooks));
	} ());
	
	
	// Destroy
	$scope.$on("$destroy", function () {
		eventHandler.forEach(handler => handler());
	});
}
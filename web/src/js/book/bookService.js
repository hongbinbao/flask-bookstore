angular.module("bookStore")
	.factory("bookService", bookService);

bookService.$inject = ["$http"];

function bookService($http) {
    var url = "/api/book/";
    var service = {
		get: get,
		loadBooks: loadBooks
    };

    return service;
	
	function loadBooks(pageNum, bookTitle) {
		return (bookTitle) ? 
				findBooks(pageNum, bookTitle) :
				getBooks(pageNum);
	}

	function getBooks(pageNum) {
		var path = url + "pages/" + pageNum;
		return $http.get(path).catch(function (err) {
			throw "Error: BookService getBooks()";
		});
	}
	
	function findBooks(pageNum, bookTitle) {
		var path = url + "search/" + bookTitle + "/pages/" + pageNum;
		return $http.get(path).catch(function (err) {
			throw "Error: BookService findBooks()";
		});
	}
	
	function get(id) {
		var path = url + id;
		return $http.get(path).catch(function (err) {
			throw "Error: There is a error when finding book";
		});
	}
}
angular.module("bookLibrary")
	.factory("bookService", bookService);

bookService.$inject = ["$http"]

function bookService($http) {
    var url = "/api/book/";
    var service = {
		get: get,
		getBooks: getBooks,
		findBooks: findBooks,
        save: save,
        validate: validate
    };

    return service;

	function getBooks(pageNum) {
		var path = url + "pages/" + pageNum;
		return $http.get(path).catch(function (err) {
			throw "Error: BookService getBooks()";
		});
	}

	function get(id) {
		var path = url + id;
		return $http.get(path).catch(function (err) {
			throw "Error: There is a error when finding book";
		});
	}
	
	function findBooks(pageNum, bookTitle) {
		var path = url + "search/" + bookTitle + "/pages/" + pageNum;
		return $http.get(path).catch(function (err) {
			throw "Error: BookService findBooks()";
		});
	}

    function save() {
        /* */
    };

    function validate() {
        /* */
    };
}
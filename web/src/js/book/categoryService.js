angular.module("bookStore")
	.factory("categoryService", categoryService);

categoryService.$inject = ["$http"];

function categoryService($http) {
    var url = "/api/category/";
    var service = {
		get: get,
		getBooks: getBooks
    };

    return service;

	function get(id) {
		var path = url + id;
		return $http.get(path).catch(function (err) {
			throw "Error: CategoryService loadBreadcrum()";
		});
	}

	function getBooks(pageNum, category) {
		var path = url + category + "/pages/" + pageNum;
		return $http.get(path).catch(function (err) {
			throw "Error: CategoryService getBooks()";
		});
	}

}
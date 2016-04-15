angular.module("bookStore")
	.factory("userService", userService);

userService.$inject = ["$http"];

function userService($http) {
    var url = "/api/user";
    var service = {
		getInfo: getInfo
    };

    return service;
	
	function getInfo() {
		var path = url + "/info";
		return $http.get(path).catch(function (err) {
			throw "Error: UserService getInfo()";
		});
	}
}
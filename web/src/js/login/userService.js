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
		return $http.get(url + "/info");
	}
}
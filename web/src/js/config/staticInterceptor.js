angular.module("bookLibrary")
	.factory("staticInterceptor", apiInterceptor);

apiInterceptor.$inject = ["$q", "config"];

function apiInterceptor($q, config) {
    return {
        request: function (req) {
			if (req.url.indexOf("template") !== -1) {
				req.url = "wwwroot/" + req.url;
			}
			return req;
        }
    }
}

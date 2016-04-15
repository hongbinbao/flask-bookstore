angular.module("bookStore")
	.factory("apiInterceptor", apiInterceptor);
	
apiInterceptor.$inject = ["$q", "config"];

function apiInterceptor($q, config) {
    return {
        request: function (req) {
			if (config.apiUrl && req.url.indexOf("/api") === 0) {
				// req.headers["Access-Control-Allow-Origin"] = "*";
				req.url = config.apiUrl + req.url;
			}
			return req;
        }
    };
}
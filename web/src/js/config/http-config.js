import "./apiInterceptor.js"
import "./staticInterceptor.js"

angular.module("bookLibrary").config(config);

function config($httpProvider) {
	$httpProvider.interceptors.push("apiInterceptor");
	$httpProvider.interceptors.push("staticInterceptor");
}

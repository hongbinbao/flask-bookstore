import "./apiInterceptor.js";
import "./staticInterceptor.js";

angular.module("bookStore").config(config);

function config($httpProvider) {
	$httpProvider.interceptors.push("apiInterceptor");
	$httpProvider.interceptors.push("staticInterceptor");
}

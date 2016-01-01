var dependencies = ["ng", "ngRoute", "ngAnimate", "sharedComponents"];

angular.module("bookStore", dependencies)
	.constant("config", {
		appName: "BookStore",
		appVersion: 1.0,
		// apiUrl: "https://nguymin4-aspnet.herokuapp.com"
		// apiUrl: "http://localhost:5004"
	});

angular.module("sharedComponents", ["ng"]);
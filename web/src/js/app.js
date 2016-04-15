var dependencies = ["ng", "ngRoute", "ngAnimate", "sharedComponents"];

angular.module("bookStore", dependencies)
	.constant("config", {
		appName: "bookStore",
		appVersion: 1.0
		// apiUrl: "https://nguymin4-aspnet.herokuapp.com"
	});

angular.module("sharedComponents", ["ng"]);
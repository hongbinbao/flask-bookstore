var dependencies = ["ng", "ngRoute", "ngAnimate", "sharedComponents"];

angular.module("bookLibrary", dependencies)
	.constant("config", {
		appName: "BookLibrary",
		appVersion: 1.0,
		// apiUrl: "https://nguymin4-aspnet.herokuapp.com"
		// apiUrl: "http://localhost:5004"
	});

angular.module("sharedComponents", ["ng"]);
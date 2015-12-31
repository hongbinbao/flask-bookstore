angular.module("sharedComponents")
	.filter("trimText", function () {
		return function(input, maxChar) {
			if (input.length <= maxChar) return input;
			else return input.substr(0, maxChar) + "...";
		}
	});
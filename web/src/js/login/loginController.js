angular.module("bookStore")
	.controller("LoginController", LoginController);

LoginController.$inject = ["$scope", "userService"];

function LoginController($scope, userService) {
	var vm = this;
	vm.buttons = [
		{
			name: "Google",
			icon: "fa-google-plus-square",
			color: "#D32F2F",
			url: "auth/login?authscheme=Google"
		}
	];

	init();

	function init() {
		userService.getInfo()
			.then(response => {
				vm.user = response.data.name ? response.data : null;
			});
	}
}
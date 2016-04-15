angular.module("bookStore").directive("loginForm", function() {
	return {
		restrict: "E",
		template: `<login-button 
						ng-repeat="btn in login.buttons" info="btn">
					</login-button>`
	};
});
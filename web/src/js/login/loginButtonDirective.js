angular.module("bookStore").directive("loginButton", function() {
	return {
		restrict: "E",
		template: `<button class="btn btn-login" style="background-color: {{ ::info.color }}">
		<i class="fa {{ ::info.icon }}" style="background-color: {{ ::info.color }}"></i>
		<span>Sign-in with {{ ::info.name }}</span>
		</button>`,
		scope: {
			info: "="
		},
		link: function($scope, $element, $attrs) {
			$element.on("click", () => location = $scope.info.url);

			// Remove listerner
			$element.on('$destroy', function() {
				$element.off("click");
			});
		}
	};
});
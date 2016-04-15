angular.module("sharedComponents")
	.directive("trackScroll", function () {
		return {
			restrict: "A",
			link: function ($scope, $element, $attrs) {
				var contentDiv = $($attrs.trackScroll);
				$(contentDiv).on("scroll", function () {
					$scope.$broadcast("windowScroll", contentDiv.scrollTop());
					if (contentDiv.scrollTop() > $element.height() - $(window).height() * 1.25) {
						$scope.$broadcast("windowScrollEnd");
					}
				});
			}
		};
	});
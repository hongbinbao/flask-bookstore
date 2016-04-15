angular.module("sharedComponents")
	.directive("blurEffect", function () {
		return {
			restrict: "E",
			link: function ($scope, $element, $attrs) {
				var target = $attrs.target || "." + $attrs.class;
				var scrollElement = $($attrs.scrollElement);
				var step = $attrs.step || 105;
				var blurRatio = 0;

				setBlur();
				$("div.content").on("scroll", setBlur);
				
				function setBlur(event) {
					blurRatio = scrollElement.scrollTop() / step;
					if (blurRatio > 5) blurRatio = 5; 
					$(target).css("filter", "blur(" + blurRatio.toFixed(1) + "px)");
					$(target).css("-webkit-filter", "blur(" + blurRatio.toFixed(1) + "px)");
				}
				var resetHeightListener = $scope.$on("blurEffect:resetHeight", function (event, posY) {
					scrollElement.scrollTop($(".jumbotron").height() + posY);
					setBlur();
				});
				
				$element.on('$destroy', function () {
					scrollElement.off("scroll", setBlur);
					resetHeightListener();
				});
			}
		};
	});
angular.module("bookStore")
	.directive("bookCell", function () {
		return {
			scope: {
				info: "="
			},
			templateUrl: "template/bookCellDirective.html",
			link: function ($scope, $element, $attrs) {
				$element.addClass("book col-md-3 col-sm-4 col-xs-6")
					.attr("title", $scope.info.name); // Title for whole element
				
				// Open Detail view when element is clicked
				$element.find("img, .title").on("click", clickHandler);
				function clickHandler() {
					window.location.hash = "/book/" + $scope.info.id;
				}
				
				// Lazy loading image
				var range = window.innerHeight * 1.5;
				var cover = $scope.info.pictures[0];
				var stopScrollListening = $scope
					.$on("windowScroll", (event, scrollY) => loadImage(scrollY));

				loadImage(window.scrollY);
				function loadImage(scrollY) {
					var top = $element.prop("offsetTop");
					if (top < scrollY + range && top > scrollY - range) {
						$element.find("img").attr("src", cover);
						stopScrollListening();
					}
				}
				
				// Remove listerner
				$element.on('$destroy', function () {
					stopScrollListening();
					$element.find("img, .title").off("click", clickHandler);
				});
			}
		}
	});
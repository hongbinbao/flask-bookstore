angular.module("bookStore")
	.directive("cartIndicator", CartIndicator);

CartIndicator.$inject = ["cartService"];
function CartIndicator(cartService) {
	return {
		restrict: "E",
		template: `
			<span class="fa fa-shopping-cart"></span>
			<span class="indicator" ng-show="vm.items.length">
				{{vm.items.length}}
			</span>`,
		bindToController: true,
		controller: CartIndicatorController,
		controllerAs: "vm",
		link: function($scope, $element, $attr) {
			$element.on("click", () => cartService.trigger("cart:open"));
		}
	};
}

CartIndicatorController.$inject = ["cartService"];
function CartIndicatorController(cartService) {
	var vm = this;
	vm.items = cartService.items;
}
angular.module("bookStore")
	.directive("cartDetail", CartDetail);

CartDetail.$inject = ["cartService"];
function CartDetail(cartService) {
	return {
		restrict: "E",
		template: `
			<div>
				<i class="fa fa-chevron-circle-up btn-close"></i>
				<table class="table table-striped .table-bordered">
					<tr>
						<th>#</th>
						<th>&nbsp;</th>
						<th>Title</th>
						<th>Quantity</th>
						<th>Unit price</th>
						<th>Total</th>
					</tr>
					<tr ng-repeat="item in vm.items">
						<td>{{ $index + 1 }}</td>
						<td>
							<img ng-src="{{ item.book.pictures[0] }}" height="100" />
						</td>
						<td style="text-align: left">{{ item.book.name }}</td>
						<td>{{ item.qty }}</td>
						<td>{{ item.book.price.amount | currency }}</td>
						<td>{{ item.book.price.amount * item.qty | currency }}</td>
					</tr>
				</table>
			</div>
			`,
		bindToController: true,
		controller: CartController,
		controllerAs: "vm",
		link: function($scope, $element, $attr) {
			cartService.on("cart:open", () => {
				$element.addClass("opened");
				$(".content").css("overflow-y", "hidden");
				$(".navbar").css("width", "100%");
			});

			$element.find(".btn-close")
				.on("click", () => {
					$element.removeClass("opened");
					setTimeout(() => {
						$(".content").css("overflow-y", "scroll");
						$(".navbar").css("width", "calc(100% - 15px)");
					}, 500);
				});
		}
	};
}

CartController.$inject = ["cartService"];
function CartController(cartService) {
	var vm = this;
	vm.items = [];
	cartService.on("update", () => vm.items = cartService.getItems());
}
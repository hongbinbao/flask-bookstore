angular.module("bookStore")
	.factory("cartService", cartService);

cartService.$inject = ["$http"];

function cartService($http) {
	var url = "/api/cart";
	var items = [];
	var events = {};
	var service = {
		addToCart: addToCart,
		getItems: () => items,
		sync: sync,
		on: on,
		trigger: trigger
	};

	fetch();

	return service;

	function addToCart(book, qty) {
		var item = items.find(item => item.book.id === book.id);
		if (item) item.qty += qty;
		else items.push({
			book: book,
			qty: qty
		});
		service.trigger("update");
		sync();
	}

	function sync() {
		var data = JSON.stringify(items.map(item => ({
			id: item.book.id,
			qty: item.qty
		})));

		return $http.post(url, data)
			.catch(err => console.log("Failed to sync cart items"));
	}

	function fetch() {
		return $http.get(url).then(res => {
			items = res.data;
			setTimeout(() => {
				service.trigger("update");
			}, 0);
		});
	}

	function on(event, fn) {
		event.split(" ").forEach(e => {
			if (events[e]) events[e].push(fn);
			else events[e] = [fn];
		});
		return service;
	}

	function trigger(event, args) {
		args = args || [];
		events[event].forEach(fn => fn.apply(this, args));
		return service;
	}
}
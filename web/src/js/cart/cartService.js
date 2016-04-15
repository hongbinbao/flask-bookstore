angular.module("bookStore")
	.factory("cartService", function() {
		var items = [];
		var events = {};
		var service = {
			addToCart: addToCart,
			items: items,
			on: on,
			trigger: trigger
		};
		
		return service;
		
		function addToCart(book, qty) {
			var item = items.find(item => item.book.id === book.id);
			if (item) item.qty += qty;
			else items.push({
				book: book,
				qty: qty
			});
		}
		
		function on(event, fn) {
			if (events[event]) events[event].push(fn);
			else events[event] = [fn];
		}
		
		function trigger(event, args) {
			args = args || [];
			events[event].forEach(fn => fn.apply(this, args));
		}
	});
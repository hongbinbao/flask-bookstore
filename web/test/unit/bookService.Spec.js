describe("Book Service ", function () {
	var injector;
	var $controller;
	var $httpBackend;
	var $rootScope;
	var bookService;

	var books = [{
		id: "asldkfj123",
		name: "One hundred years",
		category: {
			"parent": "Non-Fiction",
			"ancestors": [
				"Books",
				"Non-Fiction"
			],
			"id": "Leadership"
		}
	}];

	beforeEach(function () {
		injector = angular.injector(["ng", "ngMockE2E", "bookStore"]);
		injector.invoke(["bookService", "$httpBackend", "$rootScope", "$controller",
			function (_bookService, _$httpBackend, _$rootScope, _$controller) {
				$rootScope = _$rootScope;
				bookService = _bookService;
				$httpBackend = _$httpBackend;
				$controller = _$controller;
			}]);
	});

	describe("BookController", function () {
		var BookController;

		beforeEach(function () {
			BookController = function (dependencies) {
				dependencies = dependencies || {}
				dependencies.$scope = $rootScope;
				return $controller("BookController", dependencies)
			};
		});

		it("should fetch book when create controller", function (done) {
			$httpBackend.expectGET("/api/book/pages/0").respond(200, books);
			var controller = BookController();
			$httpBackend.flush();
			expect(controller.books.length).toEqual(books.length);
			expect(controller.books[0].name).toEqual(books[0].name);
			done();
		});

		it("should find book based on $routeParams.bookTitle", function (done) {
			$httpBackend.expectGET("/api/book/search/" + books[0].name + "/pages/0").respond(200, books);
			var controller = BookController({
				$routeParams: { bookTitle: books[0].name }
			});
			$httpBackend.flush();
			expect(controller.books.length).toEqual(1);
			expect(controller.books[0]).toEqual(books[0]);
			done();
		});
	});

	describe("BookDetailController", function () {
		var BookDetailController;

		beforeEach(function () {
			BookDetailController = function (dependencies) {
				dependencies = dependencies || {}
				dependencies.$scope = $rootScope;
				return $controller("BookDetailController", dependencies);
			};
		});

		it("should get book based on $routeParams.bookId", function (done) {
			$httpBackend.expectGET("/api/book/" + books[0].id).respond(200, books[0]);
			var controller = BookDetailController({
				$routeParams: { bookId: books[0].id }
			});
			$httpBackend.flush();
			expect(controller.info).toEqual(books[0]);
			done();
		});
	});

	afterEach(function () {
		$httpBackend.verifyNoOutstandingExpectation();
		$httpBackend.verifyNoOutstandingRequest();
	});
});

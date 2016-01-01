describe("Book Controller ", function () {
	var injector;
	var bookService;
	var httpBackend;
	var createController;
	var rootScope

	var books = [
		{
			title: "Art of War",
			pictures: ["img/cover.jpg"],
		}, {
			title: "Book2",
			pictures: ["img/cover.jpg"],
		}
	];

	beforeEach(function () {
		injector = angular.injector(["bookStore", "ngMockE2E"]);
		injector.invoke(function (_bookService_, _$httpBackend_, $rootScope, $controller) {
			rootScope = $rootScope;
			bookService = _bookService_;
			httpBackend = _$httpBackend_;
			createController = function () {
				return $controller("BookController", {
					$scope: rootScope
				})
			};
		});

	});

	afterEach(function () {
		httpBackend.verifyNoOutstandingExpectation();
		httpBackend.verifyNoOutstandingRequest();
	});

	it("should fetch book when create controller", function (done) {
		httpBackend.expect("GET", "/api/book/pages/0").respond(200, books);
		var controller = createController();
		httpBackend.flush();
		expect(controller.books).toEqual(books);
		done();
	});
});

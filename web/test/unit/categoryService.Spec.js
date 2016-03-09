describe("Category Service ", function () {
	var injector;
	var $controller;
	var $httpBackend;
	var $rootScope;
	var categoryService;

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
		injector.invoke(["categoryService", "$httpBackend", "$rootScope", "$controller",
			function (_catergoryService, _$httpBackend, _$rootScope, _$controller) {
				$rootScope = _$rootScope;
				categoryService = _catergoryService;
				$httpBackend = _$httpBackend;
				$controller = _$controller;
			}]);
	});

	describe("BookController", function () {
		var BookController;
		var category = books[0].category;
		var url = "/api/category/" + category.id
		
		beforeEach(function () {
			BookController = function (dependencies) {
				dependencies = dependencies || {}
				dependencies.$scope = $rootScope;
				return $controller("BookController", dependencies)
			};
			$httpBackend.whenGET(url + "/pages/0").respond(200, books);
			$httpBackend.whenGET(url).respond(200, category);
		});

		it("should display books in the same category based on $routeParams.category", function (done) {
			$httpBackend.expectGET(url + "/pages/0").respond(200, books);
			var controller = BookController({
				$routeParams: { category: category.id }
			});
			$httpBackend.flush();
			expect(controller.books.length).toEqual(1);
			expect(controller.books[0]).toEqual(books[0]);
			done();
		});
		
		
		it("should get breadcrum of the category based on $routeParams.category", function (done) {
			$httpBackend.expectGET(url).respond(200, category);
			var controller = BookController({
				$routeParams: { category: category.id }
			});
			$httpBackend.flush();
			expect(controller.category).toEqual(category);
			done();
		});
		
	});
	
	afterEach(function () {
		$httpBackend.verifyNoOutstandingExpectation();
		$httpBackend.verifyNoOutstandingRequest();
	});
});

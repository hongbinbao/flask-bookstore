xdescribe("<book-cell> directive ", function () {
	var injector;
	var element;
	var scope;
	var template;
	var book = {
		name: "Art of War",
		pictures: ["img/cover.jpg"],
	}

	beforeEach(function () {
		injector = angular.injector(["bookLibrary", "wwwroot/template/bookCellDirective.html"]);
		injector.invoke(function ($templateCache, $rootScope, $compile) {
			template = $templateCache.get("wwwroot/template/bookCellDirective.html");
			$templateCache.put("template/bookCellDirective.html", template);
			scope = $rootScope.$new();
			scope.book = book;
			element = $compile("<book-cell info='book'></book-cell>")(scope);
			scope.$apply();
		});
	});
	
	it("should have class 'book'", function() {
		expect(element.hasClass("book")).toBeTruthy();
	})
	
	it("should display cover and title of the book", function () {
		expect(element.find(".title").text()).toEqual(book.name);
		expect(element.find(".cover").attr("src")).toEqual(book.pictures[0]);
	});
})
describe("Detail view", function () {
	
	it("should be opened when a book is clicked in the main view", function () {
		browser.get("/");
		$$("book-cell").first().click();
		browser.getLocationAbsUrl().then(function (url) {
			expect(url).toMatch(/book\/\w+/);
		});
	});

	describe("when user clicked on an item of category breadcrumb", function () {

		beforeAll(function () {
			browser.get("#/book/5579b62cdb678e641a1c0298");
			$$(".breadcrumb li a").last().click();
		})

		it("should move to the main view", function () {
			browser.getLocationAbsUrl()
				.then(function (url) {
					expect(url).toEqual("/category/Non-Fiction");
				});
		});

		it("and display books of the same category", function () {
			expect($$("book-cell").count()).toBeGreaterThan(1);
		})
	});

});
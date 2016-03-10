describe("The main view", function () {
	beforeAll(() => browser.get('/'));

	it("should display 24 books when loaded", function () {
		expect($$("book-cell").count()).toEqual(24);
	});

	it("should load more 24 books when scroll down near the end of the page", function () {
		browser
			.executeScript("document.querySelector('.content').scrollTop = 3000;")
			.then(function () {
				expect($$("book-cell").count()).toEqual(48);
			})
	});

	describe("when user clicked on an item of category breadcrumb", function () {

		it("should display books in the same category", function () {
			browser.get("/#/category/Cookbooks");
			$$(".breadcrumb li a").get(1).click();
			browser.getLocationAbsUrl().then(function (url) {
				expect(url).toEqual("/category/Non-Fiction");
				expect($$("book-cell").count()).toBeGreaterThan(1);
			});
		});

	});

});

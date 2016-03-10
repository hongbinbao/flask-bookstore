var SearchBox = function () {
	var txtTitle = element(by.model("vm.searchBox"));
	var btnSearch = $("#btnSearch");
	var searchResult = element.all(by.repeater("book in vm.books"));

	browser.get("/");

	this.search = function (name) {
		txtTitle.clear().sendKeys(name);
		btnSearch.click();
		return searchResult.count();
	};
};

// Same suite with mainView
describe(null, function () {
	describe("when user types in the searchbox and press search button", function () {

		it("should display the books contain searched word", function () {
			var searchBox = new SearchBox();
			var count = searchBox.search("Angular");
			expect(count).toEqual(1);

			count = searchBox.search("foodumnybar");
			expect(count).toEqual(0);

			count = searchBox.search("");
			expect(count).toEqual(24);
		});

	});
})

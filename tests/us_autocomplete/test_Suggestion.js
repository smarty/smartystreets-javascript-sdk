const chai = require("chai");
const expect = chai.expect;
const Suggestion = require("../../src/us_autocomplete/Suggestion");

describe("A US Autocomplete Suggestion", function () {
	it("is initialized correctly with API response data.", function () {
		const mockSuggestion = {
			text: "a",
			street_line: "b",
			city: "c",
			state: "d"
		};
		let suggestion = new Suggestion(mockSuggestion);

		expect(suggestion.text).to.equal("a");
		expect(suggestion.streetLine).to.equal("b");
		expect(suggestion.city).to.equal("c");
		expect(suggestion.state).to.equal("d");
	});
});
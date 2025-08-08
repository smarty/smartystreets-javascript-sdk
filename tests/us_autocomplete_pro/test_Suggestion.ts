import { expect } from "chai";
import Suggestion from "../../src/us_autocomplete_pro/Suggestion.js";

describe("A US Autocomplete Pro Suggestion", function () {
	it("is initialized correctly with API response data.", function () {
		const mockSuggestion = {
			street_line: "a",
			secondary: "b",
			city: "c",
			state: "d",
			zipcode: "e",
			entries: "f",
		};
		let suggestion = new Suggestion(mockSuggestion);

		expect(suggestion.streetLine).to.equal("a");
		expect(suggestion.secondary).to.equal("b");
		expect(suggestion.city).to.equal("c");
		expect(suggestion.state).to.equal("d");
		expect(suggestion.zipcode).to.equal("e");
		expect(suggestion.entries).to.equal("f");
	});
});
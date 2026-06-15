import { expect } from "chai";
import Suggestion from "../../src/us_autocomplete/Suggestion.js";

describe("A US Autocomplete Suggestion", function () {
	it("is initialized correctly with API response data.", function () {
		const mockSuggestion = {
			smarty_key: "z",
			entry_id: "y",
			street_line: "a",
			secondary: "b",
			city: "c",
			state: "d",
			zipcode: "e",
			entries: 6,
		};
		let suggestion = new Suggestion(mockSuggestion);

		expect(suggestion.smartyKey).to.equal("z");
		expect(suggestion.entryId).to.equal("y");
		expect(suggestion.streetLine).to.equal("a");
		expect(suggestion.secondary).to.equal("b");
		expect(suggestion.city).to.equal("c");
		expect(suggestion.state).to.equal("d");
		expect(suggestion.zipcode).to.equal("e");
		expect(suggestion.entries).to.equal(6);
	});

	it("defaults smartyKey and entryId to empty strings when absent from the response.", function () {
		const mockSuggestion = {
			street_line: "a",
			city: "c",
			state: "d",
			zipcode: "e",
		};
		let suggestion = new Suggestion(mockSuggestion);

		expect(suggestion.smartyKey).to.equal("");
		expect(suggestion.entryId).to.equal("");
		expect(suggestion.entries).to.equal(0);
	});

	it("populates smartyKey and entryId from the response.", function () {
		let suggestion = new Suggestion({ smarty_key: "z", entry_id: "y" });

		expect(suggestion.smartyKey).to.equal("z");
		expect(suggestion.entryId).to.equal("y");
	});

	it("sets source only when present in the response.", function () {
		expect(new Suggestion({}).source).to.equal(undefined);
		expect(new Suggestion({ source: "postal" }).source).to.equal("postal");
	});
});

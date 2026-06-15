import { expect } from "chai";
import Lookup from "../../src/us_autocomplete/Lookup.js";

describe("A US Autocomplete Lookup", function () {
	it("can be newed up with a search.", function () {
		const expectedSearch = "a";
		let lookup = new Lookup(expectedSearch);
		expect(lookup.search).to.equal(expectedSearch);
	});

	it("defaults exclude to undefined and lets it be set.", function () {
		let lookup = new Lookup("a");
		expect(lookup.exclude).to.equal(undefined);

		lookup.exclude = "123 Main St";
		expect(lookup.exclude).to.equal("123 Main St");
	});
});

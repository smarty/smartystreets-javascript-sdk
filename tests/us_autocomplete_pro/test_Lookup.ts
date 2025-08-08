import { expect } from "chai";
import Lookup from "../../src/us_autocomplete_pro/Lookup.js";

describe("A US Autocomplete Pro Lookup", function () {
	it("can be newed up with a prefix.", function () {
		const expectedSearch = "a";
		let lookup = new Lookup(expectedSearch);
		expect(lookup.search).to.equal(expectedSearch);
	});
});
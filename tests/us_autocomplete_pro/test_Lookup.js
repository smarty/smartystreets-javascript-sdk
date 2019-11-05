const chai = require("chai");
const expect = chai.expect;
const Lookup = require("../../src/us_autocomplete_pro/Lookup");

describe("A US Autocomplete Pro Lookup", function () {
	it("can be newed up with a prefix.", function () {
		const expectedSearch = "a";
		let lookup = new Lookup(expectedSearch);
		expect(lookup.search).to.equal(expectedSearch);
	});
});
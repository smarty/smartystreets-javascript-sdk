const chai = require("chai");
const expect = chai.expect;
const Lookup = require("../../src/us_autocomplete/Lookup");

describe("A US Autocomplete Lookup", function () {
	it("can be newed up with a prefix.", function () {
		const expectedPrefix = "a";
		let lookup = new Lookup(expectedPrefix);
		expect(lookup.prefix).to.equal(expectedPrefix);
	});
});
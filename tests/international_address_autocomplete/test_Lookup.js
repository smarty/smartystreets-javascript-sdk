const chai = require("chai");
const expect = chai.expect;
const Lookup = require("../../src/international_address_autocomplete/Lookup");


describe("International Address Autocomplete lookup", function () {
	it ("Can be newed up with a prefix", function () {
		const expectedPrefix = "z";
		let lookup = new Lookup(expectedPrefix);
		expect(lookup.search).to.equal(expectedPrefix);
	})
})
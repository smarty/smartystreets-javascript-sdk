const chai = require("chai");
const expect = chai.expect;
const Lookup = require("../../src/international_address_autocomplete/Lookup");


describe("An International Address Autocomplete lookup", function () {
	it ("Can be newed up with a prefix", function () {
		const expectedPrefix = "z";
		let lookup = new Lookup(expectedPrefix);
		expect(lookup.search).to.equal(expectedPrefix);
	})

	it ("Default country parameter should be United States", function () {
		let lookup = new Lookup("z");
		expect(lookup.country).to.equal("United States");
	})

	it ("Manually set lookup to be another country", function () {
		const country = "Russia";
		const expectedPrefix = "z";
		let lookup = new Lookup(expectedPrefix, country);
		expect(lookup.country).to.equal(country);
	})
})
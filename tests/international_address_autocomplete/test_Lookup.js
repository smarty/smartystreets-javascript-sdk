const chai = require("chai");
const expect = chai.expect;
const Lookup = require("../../src/international_address_autocomplete/Lookup");

describe("An International Address Autocomplete lookup", function () {
	it("Can be newed up with a prefix", function () {
		const expectedPrefix = "z";
		let lookup = new Lookup(expectedPrefix);
		expect(lookup.search).to.equal(expectedPrefix);
	});

	it("Default country parameter should be United States", function () {
		let lookup = new Lookup("z");
		expect(lookup.country).to.equal("United States");
	});

	it("Manually set lookup to be another country", function () {
		const country = "Russia";
		const expectedPrefix = "z";
		let lookup = new Lookup(expectedPrefix, country);
		expect(lookup.country).to.equal(country);
	});

	it("Set include only administrative area param", function () {
		const administrativeArea = "administrative area";
		const expectedPrefix = "z";
		let lookup = new Lookup(expectedPrefix, "Utah", "test", administrativeArea);
		expect(lookup.include_only_administrative_area).to.equal(administrativeArea);
	});

	it("Set include only locality param", function () {
		const locality = "locality";
		const expectedPrefix = "z";
		let lookup = new Lookup(expectedPrefix, "Utah", "test", "test", locality);
		expect(lookup.include_only_locality).to.equal(locality);
	});

	it("Set include only postal code param", function () {
		const postalCode = "locality";
		const expectedPrefix = "z";
		let lookup = new Lookup(expectedPrefix, "Utah", "test", "test", "test", postalCode);
		expect(lookup.include_only_postal_code).to.equal(postalCode);
	});

	it("Checking defaults of params on instantiation ", function () {
		const defaultLookup = new Lookup("", "United States", undefined, "", "", "");
		let lookup = new Lookup();
		expect(lookup).to.deep.equal(defaultLookup);
	});
});
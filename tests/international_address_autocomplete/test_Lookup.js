const chai = require("chai");
const expect = chai.expect;
const Lookup = require("../../src/international_address_autocomplete/Lookup");

describe("An International Address Autocomplete lookup", function () {
	it("Can be newed up with a prefix", function () {
		const expectedPrefix = "z";
		let lookup = new Lookup({search: expectedPrefix});
		expect(lookup.search).to.equal(expectedPrefix);
	});

	it("Default max results parameter should be 5", function () {
		let lookup = new Lookup({search: "z"});
		expect(lookup.maxResults).to.equal(5);
	});

	it("Manually set lookup to be another country", function () {
		const country = "Russia";
		const expectedPrefix = "z";
		let lookup = new Lookup({search: expectedPrefix, country});
		expect(lookup.country).to.equal(country);
	});

	it("Set include only locality param", function () {
		const locality = "locality";
		const expectedPrefix = "z";
		let lookup = new Lookup({search: expectedPrefix, includeOnlyLocality: locality});
		expect(lookup.includeOnlyLocality).to.equal(locality);
	});

	it("Set include only postal code param", function () {
		const postalCode = "locality";
		const expectedPrefix = "z";
		let lookup = new Lookup({search: expectedPrefix, includeOnlyPostalCode: postalCode});
		expect(lookup.includeOnlyPostalCode).to.equal(postalCode);
	});

	it("Checking defaults of params on instantiation ", function () {
		const defaultLookup = {
			result: [],
			search: undefined,
			addressId: undefined,
			country: undefined,
			maxResults: 5,
			includeOnlyLocality: undefined,
			includeOnlyPostalCode: undefined,
		};
		let lookup = new Lookup();
		expect(lookup).to.deep.equal(defaultLookup);
	});
});
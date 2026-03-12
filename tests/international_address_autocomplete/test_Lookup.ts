import { expect } from "chai";
import Lookup from "../../src/international_address_autocomplete/Lookup.js";

describe("An International Address Autocomplete lookup", function () {
	it("Can be newed up with a prefix", function () {
		const expectedPrefix = "z";
		let lookup = new Lookup({ search: expectedPrefix });
		expect(lookup.search).to.equal(expectedPrefix);
	});

	it("Set address ID", function () {
		const addressId = "111";
		let lookup = new Lookup({ addressId });
		expect(lookup.addressId).to.equal(addressId);
	});

	it("Set country", function () {
		const country = "Russia";
		let lookup = new Lookup({ country });
		expect(lookup.country).to.equal(country);
	});

	it("Set max results", function () {
		const maxResults = 10000;
		let lookup = new Lookup({ maxResults });
		expect(lookup.maxResults).to.equal(maxResults);
	});

	it("Set include only include locality param", function () {
		const onlyIncludeLocality = "locality";
		let lookup = new Lookup({ includeOnlyLocality: onlyIncludeLocality });
		expect(lookup.includeOnlyLocality).to.equal(onlyIncludeLocality);
	});

	it("Set include only include postal code param", function () {
		const onlyIncludePostalCode = "post code";
		let lookup = new Lookup({ includeOnlyPostalCode: onlyIncludePostalCode });
		expect(lookup.includeOnlyPostalCode).to.equal(onlyIncludePostalCode);
	});

	it("Set max group results", function () {
		const maxGroupResults = 50;
		let lookup = new Lookup({ maxGroupResults });
		expect(lookup.maxGroupResults).to.equal(maxGroupResults);
	});

	it("Set geolocation", function () {
		const geolocation = true;
		let lookup = new Lookup({ geolocation });
		expect(lookup.geolocation).to.equal(geolocation);
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
			maxGroupResults: 100,
			geolocation: false,
			customParameters: {},
		};
		let lookup = new Lookup();
		expect(lookup).to.deep.equal(defaultLookup);
	});
});

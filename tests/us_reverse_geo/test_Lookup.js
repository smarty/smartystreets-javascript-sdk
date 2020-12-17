const chai = require("chai");
const expect = chai.expect;
const Lookup = require("../../src/us_reverse_geo/Lookup");

describe("A US Reverse Geo lookup", function () {
	it("correctly populates fields.", function () {
		let lookup = new Lookup(44.888888888, -111.111111111);

		expect(lookup.latitude).to.equal("44.88888889");
		expect(lookup.longitude).to.equal("-111.11111111");
		expect(lookup.response.results).to.deep.equal([]);
	});
});
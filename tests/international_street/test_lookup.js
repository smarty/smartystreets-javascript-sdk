const chai = require("chai");
const expect = chai.expect;
const Lookup = require("../../source/international_street/lookup");

describe("An International Street lookup", function () {
	it("correctly populates fields.", function () {
		let lookup = new Lookup("a", "b");

		expect(lookup.country).to.equal("a");
		expect(lookup.freeform).to.equal("b");
	});
});
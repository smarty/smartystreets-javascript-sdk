const chai = require("chai");
const expect = chai.expect;
const Lookup = require("../../src/us_street/Lookup");

describe ("A US Street lookup", function () {
	it ("correctly populates fields.", function () {
		const lookup = new Lookup("a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l");

		expect(lookup.street).to.equal("a");
		expect(lookup.street2).to.equal("b");
		expect(lookup.secondary).to.equal("c");
		expect(lookup.city).to.equal("d");
		expect(lookup.state).to.equal("e");
		expect(lookup.zipCode).to.equal("f");
		expect(lookup.lastLine).to.equal("g");
		expect(lookup.addressee).to.equal("h");
		expect(lookup.urbanization).to.equal("i");
		expect(lookup.match).to.equal("j");
		expect(lookup.maxCandidates).to.equal("k");
		expect(lookup.inputId).to.equal("l");
	});

	it ("has a result array.", function () {
		const lookup = new Lookup();

		expect(Array.isArray(lookup.result)).to.equal(true);
	});
});
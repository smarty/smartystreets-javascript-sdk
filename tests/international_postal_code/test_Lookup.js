const chai = require("chai");
const expect = chai.expect;
const Lookup = require("../../src/international_postal_code/Lookup");

describe("An International Postal Code lookup", function () {
	it("correctly populates fields.", function () {
		let lookup = new Lookup("Brazil", "02516-040", "SP", "Sao Paulo", "1234");

		expect(lookup.inputId).to.equal("1234");
		expect(lookup.country).to.equal("Brazil");
		expect(lookup.postalCode).to.equal("02516-040");
		expect(lookup.administrativeArea).to.equal("SP");
		expect(lookup.locality).to.equal("Sao Paulo");
		expect(lookup.result).to.deep.equal([]);
		expect(lookup.customParameters).to.deep.equal({});
	});

	it("can add custom parameters.", function () {
		let lookup = new Lookup("Brazil", "02516-040");
		lookup.addCustomParameter("test", "value");

		expect(lookup.customParameters.test).to.equal("value");
	});
});

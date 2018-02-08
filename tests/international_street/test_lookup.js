const chai = require("chai");
const expect = chai.expect;
const Lookup = require("../../source/international_street/lookup");
const errors = require("../../source/errors");

describe("An International Street lookup", function () {
	it("correctly populates fields.", function () {
		let lookup = new Lookup("a", "b");

		expect(lookup.country).to.equal("a");
		expect(lookup.freeform).to.equal("b");
	});

	it("rejects lookups without a country.", function () {
		let lookup = new Lookup();
		let expectedError = new errors.UnprocessableEntityError("Country field is required.");

		try {
			lookup.ensureEnoughInfo();
		}
		catch (error) {
			expect(error.message).to.equal(expectedError.message);
			expect(error).to.be.an.instanceOf(errors.UnprocessableEntityError);
		}
	});
});
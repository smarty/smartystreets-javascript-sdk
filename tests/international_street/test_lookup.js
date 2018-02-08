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
		const message = "Country field is required.";

		testRejection(new Lookup(), message);
	});

	it("rejects lookups with only a country.", function () {
		const message = "Either freeform or address1 is required.";

		testRejection(new Lookup("a"), message);
	});

	it("rejects lookups with only a country and address 1.", function () {
		let lookup = new Lookup("a");
		lookup.address1 = "b";

		const message = "Insufficient information: One or more required fields were not set on the lookup.";

		testRejection(lookup, message);
	});

	function testRejection(lookup, message) {
		let expectedError = new errors.UnprocessableEntityError(message);

		try {
			lookup.ensureEnoughInfo();
			expect(true).to.equal(false);
		}
		catch (error) {
			expect(error.message).to.equal(expectedError.message);
			expect(error).to.be.an.instanceOf(errors.UnprocessableEntityError);
		}
	}
});
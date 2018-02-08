const chai = require("chai");
const expect = chai.expect;
const Lookup = require("../../source/international_street/lookup");
const errors = require("../../source/errors");

describe("An International Street lookup", function () {
	const messages = {
		countryRequired: "Country field is required.",
		freeformOrAddress1Required: "Either freeform or address1 is required.",
		insufficientInformation: "Insufficient information: One or more required fields were not set on the lookup.",
	};

	it("correctly populates fields.", function () {
		let lookup = new Lookup("a", "b");

		expect(lookup.country).to.equal("a");
		expect(lookup.freeform).to.equal("b");
	});

	it("rejects lookups without a country.", function () {
		verifyErrorMessage(new Lookup(), messages.countryRequired);
	});

	it("rejects lookups with only a country.", function () {
		verifyErrorMessage(new Lookup("a"), messages.freeformOrAddress1Required);
	});

	it("rejects lookups with only a country and address 1.", function () {
		let lookup = new Lookup("a");
		lookup.address1 = "b";

		verifyErrorMessage(lookup, messages.insufficientInformation);
	});

	it("rejects lookups with only a country, address 1, and locality.", function () {
		let lookup = new Lookup("a");
		lookup.address1 = "b";
		lookup.locality = "c";

		verifyErrorMessage(lookup, messages.insufficientInformation);
	});

	it("rejects lookups with only a country, address 1, and adminstrative area.", function () {
		let lookup = new Lookup("a");
		lookup.address1 = "b";
		lookup.administrativeArea = "c";

		verifyErrorMessage(lookup, messages.insufficientInformation);
	});

	it ("accepts lookups with enough info.", function () {
		let lookup1 = new Lookup("a", "b");
		let lookup2 = new Lookup("a");
		lookup2.address1 = "b";
		lookup2.postalCode = "c";
		let lookup3 = new Lookup("a");
		lookup3.address1 = "b";
		lookup3.locality = "c";
		lookup3.administrativeArea = "d";

		expect(lookup1.ensureEnoughInfo()).to.equal(true);
		expect(lookup2.ensureEnoughInfo()).to.equal(true);
		expect(lookup3.ensureEnoughInfo()).to.equal(true);
	});

	function verifyErrorMessage(lookup, message) {
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
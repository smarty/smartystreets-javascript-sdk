const chai = require("chai");
const expect = chai.expect;
const Lookup = require("../../src/international_street/Lookup");
const errors = require("../../src/Errors");

describe("An International Street lookup", function () {
	const messages = {
		countryRequired: "Country field is required.",
		freeformOrAddress1Required: "Either freeform or address1 is required.",
		insufficientInformation: "Insufficient information: One or more required fields were not set on the lookup.",
		badGeocode: "Invalid input: geocode can only be set to 'true' (default is 'false'.",
		invalidLanguage: "Invalid input: language can only be set to 'latin' or 'native'. When not set, the the output language will match the language of the input values."
	};

	it("correctly populates fields.", function () {
		let lookup = new Lookup("a", "b");

		expect(lookup.country).to.equal("a");
		expect(lookup.freeform).to.equal("b");
	});

	it("rejects lookups without a country.", function () {
		ensureValidationThrows(new Lookup().ensureEnoughInfo, messages.countryRequired);
	});

	it("rejects lookups with only a country.", function () {
		ensureValidationThrows(new Lookup("a").ensureEnoughInfo, messages.freeformOrAddress1Required);
	});

	it("rejects lookups with only a country and address 1.", function () {
		let lookup = new Lookup("a");
		lookup.address1 = "b";

		ensureValidationThrows(lookup.ensureEnoughInfo, messages.insufficientInformation);
	});

	it("rejects lookups with only a country, address 1, and locality.", function () {
		let lookup = new Lookup("a");
		lookup.address1 = "b";
		lookup.locality = "c";

		ensureValidationThrows(lookup.ensureEnoughInfo, messages.insufficientInformation);
	});

	it("rejects lookups with only a country, address 1, and adminstrative area.", function () {
		let lookup = new Lookup("a");
		lookup.address1 = "b";
		lookup.administrativeArea = "c";

		ensureValidationThrows(lookup.ensureEnoughInfo, messages.insufficientInformation);
	});

	it("rejects lookups with an invalid geocode value.", function () {
		let lookup = new Lookup();
		lookup.geocode = "Blarg!";

		ensureValidationThrows(lookup.ensureValidData, messages.badGeocode);
	});

	it("rejects lookups with an invalid language.", function () {
		let lookup = new Lookup();
		lookup.language = "Rubberduckian";

		ensureValidationThrows(lookup.ensureValidData, messages.invalidLanguage);
	});

	it("accepts lookups with enough info.", function () {
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

	it("accepts lookups with a valid language.", function () {
		let lookup1 = new Lookup();
		lookup1.language = "latin";

		expect(lookup1.ensureValidData()).to.equal(true);

		let lookup2 = new Lookup();
		lookup2.language = "native";

		expect(lookup2.ensureValidData()).to.equal(true);
	});

	function ensureValidationThrows(callback, message) {
		let expectedError = new errors.UnprocessableEntityError(message);

		try {
			callback();
			expect(true).to.equal(false);
		}
		catch (error) {
			expect(error.message).to.equal(expectedError.message);
			expect(error).to.be.an.instanceOf(errors.UnprocessableEntityError);
		}
	}
});
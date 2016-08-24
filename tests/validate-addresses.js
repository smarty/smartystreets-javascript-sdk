// Test cases for SDK calls to the Smarty Streets API
// validate-addresses.js

// Includes
var chai = require("chai"),
	expect = chai.expect,
	Validate = require("../index");

// Sanity Check
describe("SanityCheck", function() {
	var validate = new Validate;

	it ("validate.sanityCheck() should return 'The module loaded.'", function () {
		expect(validate.sanityCheck()).to.equal("The module loaded.");
	});
});

describe("BadInputField", function () {
	var validate = new Validate;

	it ("validate.validate(\"some-id\", \"some-token\", {\"address1\": \"404 Wrong Way\"}) should return an error object with property called 'invalid_input_fields_error'", function () {
		expect(validate.validate("some-id", "some-token", {"address1": "404 Wrong Way"})).to.have.property("invalid_input_fields_error");
	});
});

describe("InsufficientData", function () {
	var validate = new Validate,
		insufficientDataErrorMessage = "Error: Request not sent. One or more lookups contained insufficient information to complete address validation. See the documentation for more information on the input field combinations required to perform a successful address validation.";

	it ("Calling validate.validate() on a lookup with insufficient data to process returns an error object with an appropriate error message and array listing bad inputs", function () {
		expect(validate.validate("some-id", "some-token", {"street2": "12345"})).to.have.property("insufficient_lookup_data_error");
		expect(validate.validate("some-id", "some-token", {"secondary": "12345"})).to.have.property("insufficient_lookup_data_error");
		expect(validate.validate("some-id", "some-token", {"city": "12345"})).to.have.property("insufficient_lookup_data_error");
		expect(validate.validate("some-id", "some-token", {"state": "12345"})).to.have.property("insufficient_lookup_data_error");
		expect(validate.validate("some-id", "some-token", {"zipcode": "12345"})).to.have.property("insufficient_lookup_data_error");
		expect(validate.validate("some-id", "some-token", {"lastline": "12345"})).to.have.property("insufficient_lookup_data_error");
		expect(validate.validate("some-id", "some-token", {"addressee": "12345"})).to.have.property("insufficient_lookup_data_error");
		expect(validate.validate("some-id", "some-token", {"urbanization": "12345"})).to.have.property("insufficient_lookup_data_error");
		expect(validate.validate("some-id", "some-token", {"candidates": 10})).to.have.property("insufficient_lookup_data_error");
	});

	it ("should not return insufficient data errors when sufficient data is provided.", function () {
		expect(validate.validate("some-id", "some-token", {"street": "110 Pasito Terr", "zipcode": "94083"})).to.not.have.property("insufficient_lookup_data_error");
	});
});


describe("BadAuthID", function () {});

describe("BadAuthToken", function () {});

describe("SingleAddressLookup", function () {});

describe("MultipleAddressLookups", function () {});

describe("SingleZipcodeLookup", function () {});

describe("MultipleZipcodeLookups", function () {});
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

	it ("validate.validate(\"some-id\", \"some-token\", {\"address1\": \"404 Wrong Way\"}) should return an error object with an array of bad inputs with a length of 1", function () {
		expect(validate.validate("some-id", "some-token", {"address1": "404 Wrong Way"})).to.have.property("message", "Error: Request not sent. One or more input fields found in the lookup have invalid input field name. See the documentation for valid input field names.");
		expect(validate.validate("some-id", "some-token", {"address1": "404 Wrong Way"})).to.have.property("invalid_input_fields").with.length(1);
	});
});

describe("InsufficientData", function () {
	var validate = new Validate;

	it ("Calling validate.validate() on a lookup with insufficient data to process returns an error object with an appropriate error message and array listing bad inputs.", function () {
		expect(validate.validate("some-id", "some-token", {"zipcode": "12345"})).to.have.property("message", "Error: Request not sent. One or more lookups contained insufficient information to complete address validation. See the documentation for more information on the input field combinations required to perform a successful address validation.");
	});
});

describe("BadAuthID", function () {});

describe("BadAuthToken", function () {});

describe("SingleAddressLookup", function () {});

describe("MultipleAddressLookups", function () {});

describe("SingleZipcodeLookup", function () {});

describe("MultipleZipcodeLookups", function () {});
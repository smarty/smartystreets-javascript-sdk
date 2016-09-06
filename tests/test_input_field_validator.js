var chai = require("chai"),
	expect = chai.expect,
	validateInputFields = require("../internal/input_field_validator");

describe ("Verify that input fields are valid to ensure the customer isn't burning lookups for no reason", function () {
	var template = {
		"a": true,
		"s": true,
		"l": true
	};

	it ("expects a lookup with one invalid input field to return an error detailing the invalid input field", function () {
		var lookup = [
			{
				"a": 32,
				"steve": false
			}
		];
		expect (validateInputFields(template, lookup)).to.include.property("invalidInputFields");
	})

	it ("expects a lookup with all valid input fields not to return any errors", function () {
		var lookup = [
			{
				"a": 32,
				"s": "male",
				"l": "Xxyzx"
			}
		];
		expect (validateInputFields(template, lookup)).to.equal(undefined);
	});
});
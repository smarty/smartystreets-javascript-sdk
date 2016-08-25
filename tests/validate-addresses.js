// Test cases for SDK calls to the Smarty Streets API
// validate-addresses.js

// Includes
var chai = require("chai"),
	expect = chai.expect,
	SmartyStreetsLibrary = require("../index"),
	authId = process.env.SMARTYSTREETS_AUTH_ID,
	authToken = process.env.SMARTYSTREETS_AUTH_TOKEN;

// console.log(authId, authToken);

var generateValidLookups = function(quantity) {
	var validLookups = [];

	for (var i = 0; i < quantity; i++) {
		validLookups.push({
			"street": "180 Pasito Terrace",
			"zipcode": "94086"
		});
	}

	return validLookups;
};

// Sanity Check
describe("SanityCheck", function () {
	var smartyStreets = new SmartyStreetsLibrary;

	it ("smartyStreets.sanityCheck() should return 'The module loaded.'", function () {
		expect(smartyStreets.sanityCheck()).to.equal("The module loaded.");
	});
});

// Break lookup lists into chunks of 100 lookups.
describe("BreakLookupsIntoGroupsOf100", function () {
	var smartyStreets = new SmartyStreetsLibrary;

	it ("expects passing 1000 lookups to validate() to return 10 grouped results", function () {
		expect(smartyStreets.validate(authId, authToken, generateValidLookups(1000))).to.have.length(10);
	});
	it ("expects passing 1 lookup to validate() to return 1 grouped result", function () {
		expect(smartyStreets.validate(authId, authToken, generateValidLookups(1))).to.have.length(1);
	});
});
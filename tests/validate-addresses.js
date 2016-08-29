// Test cases for SDK calls to the Smarty Streets API
// validate-addresses.js

// Includes
var chai = require("chai"),
	expect = chai.expect,
	SmartyStreetsLibrary = require("../index"),
	smartyStreets = new SmartyStreetsLibrary,
	authId = process.env.SMARTYSTREETS_AUTH_ID,
	authToken = process.env.SMARTYSTREETS_AUTH_TOKEN;

// console.log(authId, authToken);

var generateLookup = function(quantity, lookup) {

	var validLookups = [];

	for (var i = 0; i < quantity; i++) {
		var address = lookup || {
				"street": "180 Pasito Terrace",
				"zipcode": "94086",
				"input_id": i.toString()
			};

		validLookups.push(address);
	}

	// console.log(validLookups);
	return validLookups;
};

// Sanity Check
describe("SanityCheck", function () {
	it ("smartyStreets.sanityCheck() should return 'The module loaded.'", function () {
		expect(smartyStreets.sanityCheck()).to.equal("The module loaded.");
	});
});

// Break lookup lists into chunks of 100 lookups.
describe("BreakLookupsIntoGroupsOf100", function () {
	it ("expects passing 1000 lookups to validate() to return 10 grouped results", function () {
		expect(smartyStreets.validate(authId, authToken, generateLookup(1000))).to.include.property("lookups").with.lengthOf(10);
	});
	it ("expects passing 1 lookup to validate() to return 1 grouped result", function () {
		expect(smartyStreets.validate(authId, authToken, generateLookup(1))).to.include.property("lookups").with.lengthOf(1);
	});
});

// Flag lookups with insufficient data.
// Lookups with sufficient data have at least one of the following minimum data structures:
// street, city, state
// street, zipcode
// freeform street (street, city, state or street zipcode on the same line)
describe("insufficientDataInLookups", function () {
	// it ("expects a request with a street, city, and zipcode to not return errors", function () {
	// 	expect(smartyStreets.validate(authId, authToken, generateLookup(1, {"street": "180 Pasito Terrace", "city": "Sunnyvale", "state": "CA"}))).to.not.have.key("error.insufficient_data");
	// });
	it ("expects a request with just a street and city to return errors", function () {
		var lookupWithOnlyStreetAndCity = {
			"street": "404 Wrong Way",
			"city": "Middle of Nowhere"
		};

		expect(smartyStreets.validate(authId, authToken, generateLookup(1, lookupWithOnlyStreetAndCity))).to.include.deep.property("errors.lookupHasInsufficientData[0]", lookupWithOnlyStreetAndCity);
	});
});

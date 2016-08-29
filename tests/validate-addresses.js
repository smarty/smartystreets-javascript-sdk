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

var generateLookups = function(quantity, options, lookup) {
	var validLookups = [];

	for (var i = 0; i < quantity; i++) {
		var address = lookup || {
				"input_id": i.toString()
			};

		if (options.street) {
			address.street = "180 Pasito Terrace";
		}

		if (options.city) {
			address.city = "Sunnyvale";
		}

		if (options.state) {
			address.state = "CA";
		}

		if (options.zipcode) {
			address.zipcode = "94086";
		}

		if (options.secondary) {
			address.secondary = "Apt 217";
		}

		if (options.lastline) {
			address.lastline = "Sunnyvale, CA, 94086";
		}

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
		expect(smartyStreets.validate(authId, authToken, generateLookups(1000, {"street": true, "lastline": true}))).to.include.property("lookups").with.lengthOf(10);
	});
	it ("expects passing 1 lookup to validate() to return 1 grouped result", function () {
		expect(smartyStreets.validate(authId, authToken, generateLookups(1, {"street": true, "lastline": true}))).to.include.property("lookups").with.lengthOf(1);
	});
});

// Flag lookups with insufficient data.
// Lookups with sufficient data have at least one of the following minimum data structures:
// street, city, state
// street, zipcode
// freeform street (street, city, state or street zipcode on the same line)
describe("insufficientDataInLookups", function () {
	// it ("expects a request with a street, city, and zipcode to not return errors", function () {
	// 	expect(smartyStreets.validate(authId, authToken, generateLookups(1, {"street": "180 Pasito Terrace", "city": "Sunnyvale", "state": "CA"}))).to.not.have.key("error.insufficient_data");
	// });
	it ("expects a request with insufficient to return errors", function () {
		var badAddresses = [
				{},
				{
					"street": "404 Wrong Way",
					"city": "Middle of Nowhere"
				},
				{
					"street": "404 3 St"
				},
				{
					"city": "Middle of Nowhere",
					"state": "Denial"
				},
				{
					"street": "404 Wrong Way",
					"state": "Denial"
				},
				{
					"zipcode": "12345"
				},
				{
					"lastline": "Joe Bloe Ville, KY, 12345"
				}
			],
			goodAddresses = [
				generateLookups(1, {"street": true, "city": true, "state": true}),
				generateLookups(1, {"street": true, "city": true, "zipcode": true}),
				generateLookups(1, {"street": true, "zipcode": true}),
				generateLookups(1, {"street": true, "lastline": true})
			];

		for (var i = 0; i < badAddresses.length; i++) {
			var address = badAddresses[i];
			expect(smartyStreets.validate(authId, authToken, address)).to.include.deep.property("errors.lookupsHaveInsufficientData[0]", address);
		}

		for (var i = 0; i < goodAddresses.length; i++) {
			var address = goodAddresses[i];

			expect(smartyStreets.validate(authId, authToken, address)).to.not.include.property("error.lookupsHaveInsufficientData");
		}
	});
});

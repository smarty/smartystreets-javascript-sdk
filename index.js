"use strict"

const https = require("https");
var Validate = function () {};

// Example addresses
// 
// Single address lookup.
// 
// {
//     "input_id": 123,
//     "street": "117 Easy Street",
//     "street2": "Leave it on the front porch.",
//     "secondary": "Apt 1",
//     "city": "Mountain View",
//     "state": "CA",
//     "zipcode": "94043",
//     "lastline": "Mountain View CA 94043",
//     "addressee": "AP+I Design Inc.",
//     "urbanization": "Only used in Puerto Rico",
//     "candidates": 10
// }
//  
//  Multiple address lookups.
//        
// [
//     {
//         "input_id": 123,
//         "street": "117 Easy Street",
//         "street2": "Leave it on the front porch.",
//         "secondary": "Apt 1",
//         "city": "Mountain View",
//         "state": "CA",
//         "zipcode": "94043",
//         "lastline": "Mountain View CA 94043",
//         "addressee": "AP+I Design Inc.",
//         "urbanization": "Only used in Puerto Rico",
//         "candidates": 10
//     },
//     {
//         "input_id": 124,
//         "street": "110 Pasito Terr",
//         "street2": "Leave it on the front porch.",
//         "secondary": "Apt 217",
//         "city": "Sunnyvale",
//         "state": "CA",
//         "zipcode": "94086",
//         "lastline": "Sunnyvale CA 94086",
//         "addressee": "Briarwood Apartments",
//         "candidates": 10
//     }
// ]

// A helper function for detemring if an address has a valid field.
var lookupHasValidInputField = function (address, inputField) {
	if (address.hasOwnProperty(inputField) && address[inputField]) {
		return true;
	}

	return false;
};

Validate.prototype.validate = function (auth_id, auth_token, addresses, options) {
	addresses = [].concat(addresses);
	options = options || {};

	// A template lookup object.
	var exampleLookup = {
			"input_id": true,
			"street": true,
			"street2": true,
			"secondary": true,
			"city": true,
			"state": true,
			"zipcode": true,
			"lastline": true,
			"addressee": true,
			"urbanization": true,
			"candidates": true
		},
		// Basic settings for the https request.
		baseSettings = {
			hostname: "api.smartystreets.com",
			port: 443,
			path: "/street-address?auth-id=" + auth_id + "&auth-token=" + auth_token,
			// Adjust the request method depending on the number of lookups fed to the API.
			method: addresses.length === 1 ? "GET" : "POST",
			headers: {
				"Content-Type": "application/json",
				"Host": "api.smartystreets.com"
			}
		},
		settings = baseSettings,
		// An array of lookups in subarrays of up to 100.
		lookups = [],
		lookupGroup = [],
		// The object that is returned if errors are encountered.
		errors = {},
		// An array of bad lookups to be return to the user.
		invalidInputFields = [],
		insufficientLookupData = [];

	// Split list of lookups into groups of 100.
	for (var i = 0; i < addresses.length; i++) {
		// If the lookup group container has 100 lookups in it, add it to the lookups array and clear it for the next batch.
		if (lookupGroup.length === 100) {
			lookups.push(lookupGroup);
			lookupGroup = [];
		}

		var lookup = addresses[i];

		// console.log("Vetting lookup at index " + i + " for submittal to the API.");
		// console.log("Checking keys.");

		// Validate the input fields.
		for (var key in lookup) {
			// console.log("\tChecking key: " + key);
			if (exampleLookup.hasOwnProperty(key)) {
				// console.log("\t\t" + key + " is a valid key.");
				settings.path += "&" + key + "=" + encodeURIComponent(lookup[key]);
			} else {
				// console.log("\t\t" + key + " is not a valid key. Saving an error.");
				// If an input field doesn't match the lookup template variable, add it to the invalidInputFields array.
				invalidInputFields.push({
					"index": i,
					"input_field": key
				});
			}
		}

		// Make sure there's enough data in the lookup to perform a lookup.
		// A valid lookup can contain only a street, city, and state.
		if (lookupHasValidInputField(lookup, "street") && lookupHasValidInputField(lookup, "city") && lookupHasValidInputField(lookup, "state")) {
			// console.log("\tLookup " + i + " has enough street, city, and state data to perform an API request.");
			lookupGroup.push(lookup);
		}

		// A valid lookup can contain only a street and zipcode.
		else if (lookupHasValidInputField(lookup, "street") && lookupHasValidInputField(lookup, "zipcode")) {
			// console.log("\tLookup " + i + " has enough street and zipcode data to perform an API request.");
			lookupGroup.push(lookup);
		}

		// A valid look can contain only freeform street
		else if (lookupHasValidInputField(lookup, "street")) {
			// console.log("\tLookup " + i + " has enough freeform street to perform an API request.");
			lookupGroup.push(lookup)
		}

		// If a case is not matched, throw an error.
		else {
			// console.log("\tLookup " + i + " does not have enough data to perform an API request.");
			insufficientLookupData.push({
				"index": i
			});
		}
	}
	
	// console.log("\tNumber of input field errors:", invalidInputFields.length);
	// console.log("\tIndexes with invalid input fields: ", invalidInputFields);
	// console.log("");
	// console.log("\tNumber of insufficient data lookup errors:", insufficientLookupData.length);
	// console.log("\tIndexes with insufficient data: ", insufficientLookupData);
	// Build the error return object.

	// If there were lookups with invalid input fields, return an error.
	// console.log("\t" + invalidInputFields);

	if (invalidInputFields.length > 0) {
		errors["invalid_input_fields_error"] =  {
			"message": "Error: Request not sent. One or more input fields found in the lookup have invalid input field name. See the documentation for valid input field names.",
			"invalid_input_fields": invalidInputFields
		};
	}

	// If there were lookups with insufficient input fields, return an error.
	if (insufficientLookupData.length > 0) {
		errors["insufficient_lookup_data_error"] = {
			"message": "Error: Request not sent. One or more lookups contained insufficient information to complete address validation. See the documentation for more information on the input field combinations required to perform a successful address validation.",
			"invalid_lookup_indexes": insufficientLookupData
		};
	}

	// console.log(errors);

	// If there were errors, return the errors.
	return errors;


	// Iterate through each address fed to 
	for (var i = 0; i < addresses.length; i++) {

		// var req = https.request(settings, (res) => {
		// 	console.log("Status Code:", res.statusCode);
		// 	console.log("Headers:", res.headers);

		// 	res.on("data", (d) => {
		// 		process.stdout.write(d);
		// 	});

		// 	res.on("error", (e) => {
		// 		console.log(e);
		// 	});

		// 	res.end();
		// });
	};
};

Validate.prototype.sanityCheck = function() {
	return "The module loaded.";
};

module.exports = Validate;
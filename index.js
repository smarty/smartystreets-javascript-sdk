"use strict"

const https = require("https");
var SmartyStreets = function () {},
	lookupTemplate = {
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
	errors = {};

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

SmartyStreets.prototype.validate = function (authId, authToken, lookups) {
	errors = {};
	lookups = [].concat(lookups);

	var returnObject =  {
		"lookups": breakLookupsIntoMaxSizedGroups(lookups),
		"errors": getErrors()
	};

	console.log(returnObject.errors);
	return returnObject
}

var breakLookupsIntoMaxSizedGroups = function (lookups) {
	var returnData = [],
		apiLookupGroup = [],
		apiLookupLimit = 100;

	while (lookups.length > 0) {
		apiLookupGroup = lookups.splice(0, apiLookupLimit);
		apiLookupGroup.forEach(function (lookup) {
			logIfLookupHasInsufficientData(lookup);
		});
		returnData.push(apiLookupGroup);
	}

	// console.log(returnData);

	return returnData;
};

var logIfLookupHasInsufficientData = function (lookup) {
	var minimumFreeformStreetLength = 9;

	// console.log(lookup)

	if (lookup.hasOwnProperty("street") && lookup.hasOwnProperty("zipcode")) {
		// console.log("\tStreet and zipcode found.");
	} else if (lookup.hasOwnProperty("street") && lookup.hasOwnProperty("city") && lookup.hasOwnProperty("state")) {
		// console.log("\tStreet, city, and state found.");
	} else if (lookup.hasOwnProperty("street") && lookup.hasOwnProperty("city") && lookup.hasOwnProperty("zipcode")) {
		// console.log("\tStreet, city, and state found.");
	} else if (lookup.hasOwnProperty("street") && lookup.street.length > minimumFreeformStreetLength && !lookup.hasOwnProperty("city") && !lookup.hasOwnProperty("state") && !lookup.hasOwnProperty("zipcode")) {
		// console.log("\tAddress length is sufficiently long to be a freeform address.");
	} else if (lookup.hasOwnProperty("street") && lookup.hasOwnProperty("lastline")) {
		// console.log("\tAddress length is sufficiently long to be a freeform address.");
	} else {
		// console.log("\tNot enough data to return useful information.");
		recordError("lookupsHaveInsufficientData", lookup);
	}
};

var getErrors = function () {
	return errors;
};

var recordError = function (errorGroup, elementWithAnError) {
	if (!errors.hasOwnProperty(errorGroup)) {
		errors[errorGroup] = [elementWithAnError];
	} else {
		errors[errorGroup].push(elementWithAnError);
	}
}

var inputFieldIsValid = function (inputField) {
	if (lookupTemplate.hasOwnProperty(inputField) && inputField) {
		return true;
	}

	return false;
};


var makeHttpsRequest = function () {
	var req = https.request(settings, (res) => {
		console.log("Status Code:", res.statusCode);
		console.log("Headers:", res.headers);

		res.on("data", (d) => {
			process.stdout.write(d);
		});

		res.on("error", (e) => {
			console.log(e);
		});

		res.end();
	});
};

SmartyStreets.prototype.sanityCheck = function() {
	return "The module loaded.";
};

module.exports = SmartyStreets;
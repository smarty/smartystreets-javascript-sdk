"use strict"

const https = require("https");
var SmartyStreets = function () {};

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
	return breakLookupsIntoGroupsOf100(lookups);
}

var breakLookupsIntoGroupsOf100 = function (lookups) {
	var returnArray = [],
		groupOf100 = [];

	for (var i = 0; i < lookups.length; i++) {
		if (i % 100 === 0) {
			returnArray.push(groupOf100);
			groupOf100 = [];
		}

		groupOf100.push(lookups[i]);
	}

	return returnArray;
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
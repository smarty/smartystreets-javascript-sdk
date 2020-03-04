const SmartyStreetsSDK = require("smartystreets-javascript-sdk");
const SmartyStreetsCore = SmartyStreetsSDK.core;
const Lookup = SmartyStreetsSDK.usStreet.Lookup;

let authId = process.env.SMARTY_AUTH_ID;
let authToken = process.env.SMARTY_AUTH_TOKEN;
const credentials = new SmartyStreetsCore.StaticCredentials(authId, authToken);

let client = SmartyStreetsCore.buildClient.usStreet(credentials);

// Documentation for input fields can be found at:
// https://smartystreets.com/docs/us-street-api#input-fields

let lookup1 = new Lookup();
lookup1.inputId = "24601";  // Optional ID from your system
lookup1.addressee = "John Doe";
lookup1.street = "330 N 100 W";
lookup1.street2 = "closet under the stairs";
lookup1.secondary = "APT 2";
lookup1.urbanization = "";  // Only applies to Puerto Rico addresses
lookup1.city = "Provo";
lookup1.state = "Utah";
lookup1.zipCode = "84601";
lookup1.maxCandidates = 3;
lookup1.match = "invalid"; // "invalid" is the most permissive match,
						   // this will always return at least one result even if the address is invalid.
						   // Refer to the documentation for additional MatchStrategy options.

let lookup2 = new Lookup();
lookup2.street = "1600 Amphitheater Pkwy";
lookup2.lastLine = "Mountainview, CA";
lookup2.maxCandidates = 5;

let lookup3 = new Lookup();
lookup3.inputId = "8675309";
lookup3.street = "1600 Amphitheatre Parkway Mountain View, CA 94043";
lookup3.maxCandidates = 1;

let batch = new SmartyStreetsCore.Batch();
batch.add(lookup1);
batch.add(lookup2);
batch.add(lookup3);

client.send(batch)
	.then(handleSuccess)
	.catch(handleError);

function handleSuccess(response) {
	response.lookups.map(lookup => console.log(lookup.result));
}

function handleError(response) {
	console.log(response);
}

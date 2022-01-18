const SmartySDK = require("smartystreets-javascript-sdk");
const SmartyCore = SmartySDK.core;
const Lookup = SmartySDK.usStreet.Lookup;

// for Server-to-server requests, use this code:
// let authId = process.env.SMARTY_AUTH_ID;
// let authToken = process.env.SMARTY_AUTH_TOKEN;
// const credentials = new SmartyCore.StaticCredentials(authId, authToken);

// for client-side requests (browser/mobile), use this code:
let key = process.env.SMARTY_WEBSITE_KEY;
const credentials = new SmartyCore.SharedCredentials(key);

// The appropriate license values to be used for your subscriptions
// can be found on the Subscription page of the account dashboard.
// https://www.smarty.com/docs/cloud/licensing
let clientBuilder = new SmartyCore.ClientBuilder(credentials).withBaseUrl("YOUR URL").withLicenses(["us-rooftop-geocoding-cloud"]);
let client = clientBuilder.buildUsStreetApiClient();

// Documentation for input fields can be found at:
// https://www.smarty.com/docs/us-street-api#input-fields

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

// NOTE: batches are not supported when using SharedCredentials.
let batch = new SmartyCore.Batch();
batch.add(lookup1);
batch.add(lookup2);
batch.add(lookup3);

await handleResponse(batch);

function handleSuccess(response) {
	response.lookups.map(lookup => console.log(lookup.result));
}

function handleError(response) {
	console.log(response);
}

async function handleResponse(lookup) {
	try {
		const result = await client.send(lookup);
		handleSuccess(result);
	} catch(err) {
		handleError(err);
	}
}
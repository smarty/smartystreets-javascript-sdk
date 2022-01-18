const SmartySDK = require("smartystreets-javascript-sdk");
const SmartyCore = SmartySDK.core;
const Lookup = SmartySDK.internationalAddressAutocomplete.Lookup;

// US Autocomplete Pro only supports using Website Keys
let key = process.env.SMARTY_WEBSITE_KEY;
const credentials = new SmartyCore.SharedCredentials(key);

// The appropriate license values to be used for your subscriptions
// can be found on the Subscription page of the account dashboard.
// https://www.smarty.com/docs/cloud/licensing
let clientBuilder = new SmartyCore.ClientBuilder(credentials).withLicenses(["international-autocomplete-cloud"])
// .withBaseUrl("");
let client = clientBuilder.buildInternationalAddressAutocompleteClient();

// Documentation for input fields can be found at:
//www.smarty.com/docs/cloud/international-address-autocomplete-api#pro-http-request-input-fields

let lookup = new Lookup("Ave", "CAN");
await handleRequest(lookup, "Simple Request");

// *** Using Filter and Prefer ***
lookup = new Lookup("Ave", "CAN");

lookup.maxResults = 10;
// lookup.include_only_administrative_area = "";
lookup.include_only_locality = "Sherwood Park";
// lookup.include_only_postal_code = "";

await handleRequest(lookup, "Using Filter and Prefer");


function logSuggestions(response, message) {
	console.log(message);
	console.log(response.result);
	console.log("*********************");
}

async function handleRequest(lookup, lookupType) {
	try {
		const results = await client.send(lookup);
		logSuggestions(results, lookupType);
	} catch(err) {
		console.log(err)
	}
}
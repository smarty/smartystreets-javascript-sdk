const SmartyStreetsSDK = require("smartystreets-javascript-sdk");
const SmartyStreetsCore = SmartyStreetsSDK.core;
const Lookup = SmartyStreetsSDK.internationalAddressAutocomplete.Lookup;

// US Autocomplete Pro only supports using Website Keys
let key = process.env.SMARTY_WEBSITE_KEY;
const credentials = new SmartyStreetsCore.SharedCredentials(key);

// The appropriate license values to be used for your subscriptions
// can be found on the Subscription page of the account dashboard.
// https://www.smartystreets.com/docs/cloud/licensing
let clientBuilder = new SmartyStreetsCore.ClientBuilder(credentials).withLicenses(["international-autocomplete-cloud"])
// .withBaseUrl("");
let client = clientBuilder.buildInternationalAddressAutocompleteClient();

// Documentation for input fields can be found at:
//www.smartystreets.com/docs/cloud/international-address-autocomplete-api#pro-http-request-input-fields

let lookup = new Lookup("Ave", "CAN");

client.send(lookup)
	.then(function (results) {
		logSuggestions(results, "Simple Lookup");
	})
	.catch(console.log);

// *** Using Filter and Prefer ***
lookup = new Lookup("Ave", "CAN");

lookup.maxResults = 10;
lookup.include_only_locality = "Sherwood Park";

client.send(lookup)
	.then(function(results) { logSuggestions(results, "Using Filter and Prefer")})
	.catch(console.log);

function logSuggestions(response, message) {
	console.log(message);
	console.log(response.result);
	console.log("*********************");
}
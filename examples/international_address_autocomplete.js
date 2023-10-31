const SmartySDK = require("smartystreets-javascript-sdk");
const SmartyCore = SmartySDK.core;
const Lookup = SmartySDK.internationalAddressAutocomplete.Lookup;

// US Autocomplete Pro only supports using Embedded Keys
let key = process.env.SMARTY_EMBEDDED_KEY;
let hostname = process.env.SMARTY_HOSTNAME;
const credentials = new SmartyCore.SharedCredentials(key, hostname);

// The appropriate license values to be used for your subscriptions
// can be found on the Subscription page of the account dashboard.
// https://www.smarty.com/docs/cloud/licensing
let clientBuilder = new SmartyCore.ClientBuilder(credentials).withLicenses(["international-autocomplete-v2-cloud"])
// .withBaseUrl("");
let client = clientBuilder.buildInternationalAddressAutocompleteClient();

// Documentation for input fields can be found at:
//www.smarty.com/docs/cloud/international-address-autocomplete-api#pro-http-request-input-fields

let lookup = new Lookup({search: "Louis", country: "FRA"});

console.log("Example request using the first result addressId in each subsequent request until results are refined to a single suggestion.");
console.log("*".repeat(20) + "\n");

console.log("Performing simple request...");
lookup = await handleRequest(lookup);
logSuggestions(lookup);
lookup.addressId = lookup.result[0].addressId;

console.log("Performing new request with refined addressId");
lookup = await handleRequest(lookup);
logSuggestions(lookup);
lookup.addressId = lookup.result[0].addressId;

console.log("Performing new request with refined addressId");
lookup = await handleRequest(lookup);
console.log("final result refined to address data: ", lookup.result);

function logSuggestions(response) {
	console.log(response.result);
	console.log("*".repeat(20));
	console.log("\nusing first result with addressId:", response.result[0].addressId, "for next lookup...")
}

async function handleRequest(lookup) {
	try {
		return await client.send(lookup);
	} catch(err) {
		console.log(err)
	}
}
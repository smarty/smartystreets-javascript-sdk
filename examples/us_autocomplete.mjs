import SmartySDK from "smartystreets-javascript-sdk";

// This example is for US Autocomplete (V2). It has the same name as a previous product
// which has been deprecated since 2022, which we refer to as US Autocomplete Basic.
// If you are still using US Autocomplete Basic, this SDK will not work.

const SmartyCore = SmartySDK.core;
const Lookup = SmartySDK.usAutocomplete.Lookup;

// for client-side requests (browser/mobile), use this code:
// let key = process.env.SMARTY_EMBEDDED_KEY;
// const credentials = new SmartyCore.SharedCredentials(key);

// for Server-to-server requests, use this code:
let authId = process.env.SMARTY_AUTH_ID;
let authToken = process.env.SMARTY_AUTH_TOKEN;
const credentials = new SmartyCore.BasicAuthCredentials(authId, authToken);

// The appropriate license values to be used for your subscriptions
// can be found on the Subscription page of the account dashboard.
// https://www.smarty.com/docs/cloud/licensing
let clientBuilder = new SmartyCore.ClientBuilder(credentials);
// .withBaseUrl("YOUR URL") // withBaseUrl() should be used if you are self-hosting the Smarty API

let client = clientBuilder.buildUsAutocompleteClient();

// Documentation for input fields can be found at:
// https://www.smarty.com/docs/apis/us-autocomplete-v2/reference#http-request-input-fields

// *** Simple Lookup ***
let lookup = new Lookup("4770 Lincoln");
// uncomment the following line to add a custom parameter
// lookup.addCustomParameter("max_results", 3);

await handleRequest(lookup, "Simple Lookup");

// *** Using Filter and Prefer ***
lookup = new Lookup("4770 Lincoln");

lookup.maxResults = 10;
lookup.includeOnlyCities = ["Chicago,La Grange,IL", "Blaine,WA"];
lookup.preferStates = ["IL"];
lookup.preferRatio = 33;
lookup.source = "all";

await handleRequest(lookup, "Using Filter and Prefer");

// *** Using 'selected' to Expand Secondaries ***
// Take an entry_id from a previous result that has secondaries and pass it back as the selected address.
const entryId = lookup.result.find((suggestion) => suggestion.entryId)?.entryId;
if (entryId) {
	lookup = new Lookup("4770 Lincoln");
	lookup.selected = entryId;
	await handleRequest(lookup, "Using 'selected' to Expand Secondaries");
}

// ************************************************

function logSuggestions(response, message) {
	console.log(message);
	console.log(response.result);
	console.log("*********************");
}

async function handleRequest(lookup, lookupType) {
	try {
		const results = await client.send(lookup);
		logSuggestions(results, lookupType);
	} catch (err) {
		console.log(err);
	}
}

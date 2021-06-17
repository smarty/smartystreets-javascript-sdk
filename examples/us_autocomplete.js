const SmartyStreetsSDK = require("smartystreets-javascript-sdk");
const SmartyStreetsCore = SmartyStreetsSDK.core;
const Lookup = SmartyStreetsSDK.usAutocomplete.Lookup;

// for Server-to-server requests, use this code:
// let authId = process.env.SMARTY_AUTH_ID;
// let authToken = process.env.SMARTY_AUTH_TOKEN;
// const credentials = new SmartyStreetsCore.StaticCredentials(authId, authToken);

// for client-side requests (browser/mobile), use this code:
let key = process.env.SMARTY_WEBSITE_KEY;
const credentials = new SmartyStreetsCore.SharedCredentials(key);

let clientBuilder = new SmartyStreetsCore.ClientBuilder(credentials);
// .withBaseUrl("");
let client = clientBuilder.buildUsAutocompleteClient();

// Documentation for input fields can be found at:
// https://smartystreets.com/docs/cloud/us-autocomplete-api#http-request-input-fields

let lookup = new Lookup("4770 Lincoln Ave O");

client.send(lookup)
	.then(logSuggestions)
	.catch(console.log);

lookup.maxSuggestions = 10;

lookup.cityFilter = ["Ogden"];
lookup.stateFilter = ["IL"];
lookup.prefer = ["Ogden, IL"];
lookup.preferRatio = 0.33333333;

client.send(lookup)
	.then(logSuggestions)
	.catch(console.log);

function logSuggestions(response) {
	console.log(response.result);
	console.log("*********************");
}
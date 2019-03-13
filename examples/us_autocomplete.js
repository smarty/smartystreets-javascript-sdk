const SmartyStreetsSDK = require("../index");
const SmartyStreetsCore = SmartyStreetsSDK.core;
const Lookup = SmartyStreetsSDK.usAutocomplete.Lookup;

let websiteKey = "put your website key here.";

let clientBuilder = new SmartyStreetsCore.ClientBuilder(new SmartyStreetsCore.SharedCredentials(websiteKey));
let client = clientBuilder.buildUsAutocompleteClient();

// Documentation for input fields can be found at:
// https://smartystreets.com/docs/cloud/us-autocomplete-api#http-request-input-fields

let lookup = new Lookup("1080 Pasito");
lookup.maxSuggestions = 10;
lookup.cityFilter = ["Geneva", "Florence", "Bethlehem"];
lookup.stateFilter = ["Alabama", "Florida"];
lookup.prefer = ["Geneva,AL", "Bethlehem,Florida"];
lookup.preferRatio = 0.33333333;

client.send(lookup)
	.then(logSuggestions)
	.catch(console.log);

function logSuggestions(response) {
	console.log(response.result);
}
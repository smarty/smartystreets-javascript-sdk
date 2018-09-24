const SmartyStreetsSDK = require("../index");
const SmartyStreetsCore = SmartyStreetsSDK.core;
const Lookup = SmartyStreetsSDK.usAutocomplete.Lookup;

let websiteKey = "put your website key here.";

let clientBuilder = new SmartyStreetsCore.ClientBuilder(new SmartyStreetsCore.SharedCredentials(websiteKey));
let client = clientBuilder.buildUsAutocompleteClient();
let lookup = new Lookup("1080 Pasito");

client.send(lookup)
	.then(logSuggestions)
	.catch(console.log);

function logSuggestions(response) {
	console.log(response.result);
}
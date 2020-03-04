const SmartyStreetsSDK = require("smartystreets-javascript-sdk");
const SmartyStreetsCore = SmartyStreetsSDK.core;
const Lookup = SmartyStreetsSDK.usExtract.Lookup;

let authId = process.env.SMARTY_AUTH_ID;
let authToken = process.env.SMARTY_AUTH_TOKEN;
const credentials = new SmartyStreetsCore.StaticCredentials(authId, authToken);

let client = SmartyStreetsCore.buildClient.usExtract(credentials);

// Documentation for input fields can be found at:
// https://smartystreets.com/docs/cloud/us-extract-api#http-request-input-fields

let lookup = new Lookup("If you work at 1600 Pennsylvania Ave NW, Washington DC you're gonna have a hard time.");
lookup.aggressive = true;
lookup.addressesHaveLineBreaks = false;
lookup.addressesPerLine = 1;

client.send(lookup)
	.then(logResult)
	.catch(console.log);

function logResult(response) {
	console.log(response.result);
}
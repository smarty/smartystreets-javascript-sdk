const SmartySDK = require("smartystreets-javascript-sdk");
const SmartyCore = SmartySDK.core;
const Lookup = SmartySDK.usExtract.Lookup;

// for Server-to-server requests, use this code:
// let authId = process.env.SMARTY_AUTH_ID;
// let authToken = process.env.SMARTY_AUTH_TOKEN;
// const credentials = new SmartyCore.StaticCredentials(authId, authToken);

// for client-side requests (browser/mobile), use this code:
let key = process.env.SMARTY_WEBSITE_KEY;
const credentials = new SmartyCore.SharedCredentials(key);

let clientBuilder = new SmartyCore.ClientBuilder(credentials);
// .withBaseUrl("");
let client = clientBuilder.buildUsExtractClient();

// Documentation for input fields can be found at:
// https://www.smarty.com/docs/cloud/us-extract-api#http-request-input-fields

let lookup = new Lookup("If you work at 1600 Pennsylvania Ave NW, Washington DC you're gonna have a hard time.");
lookup.aggressive = true;
lookup.addressesHaveLineBreaks = false;
lookup.addressesPerLine = 1;

await handleRequest(lookup);

function logResult(response) {
	console.log(response.result);
}

async function handleRequest(lookup) {
	try {
		const response = await client.send(lookup);
		logResult(response);
	} catch(err) {
		console.log(err);
	}
}
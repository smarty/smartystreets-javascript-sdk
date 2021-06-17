const SmartyStreetsSDK = require("smartystreets-javascript-sdk");
const SmartyStreetsCore = SmartyStreetsSDK.core;
const Lookup = SmartyStreetsSDK.usReverseGeo.Lookup;

// for Server-to-server requests, use this code:
// let authId = process.env.SMARTY_AUTH_ID;
// let authToken = process.env.SMARTY_AUTH_TOKEN;
// const credentials = new SmartyStreetsCore.StaticCredentials(authId, authToken);

// for client-side requests (browser/mobile), use this code:
let key = process.env.SMARTY_WEBSITE_KEY;
const credentials = new SmartyStreetsCore.SharedCredentials(key);

// The appropriate license values to be used for your subscriptions
// can be found on the Subscription page of the account dashboard.
// https://www.smartystreets.com/docs/cloud/licensing
let clientBuilder = new SmartyStreetsCore.ClientBuilder(credentials).withLicenses(["us-reverse-geocoding-cloud"]);
// .withBaseUrl("");
let client = clientBuilder.buildUsReverseGeoClient();

let lookup1 = new Lookup(40.27644, -111.65747);

client.send(lookup1)
	.then(displayResult)
	.catch(handleError);

function displayResult(result) {
	console.log(result.result[0].address);
}

function handleError(error) {
	console.log("ERROR:", error);
}

import SmartySDK from "smartystreets-javascript-sdk";

const SmartyCore = SmartySDK.core;
const Lookup = SmartySDK.usReverseGeo.Lookup;

// for Server-to-server requests, use this code:
// let authId = process.env.SMARTY_AUTH_ID;
// let authToken = process.env.SMARTY_AUTH_TOKEN;
// const credentials = new SmartyCore.StaticCredentials(authId, authToken);

// for client-side requests (browser/mobile), use this code:
let key = process.env.SMARTY_EMBEDDED_KEY;
const credentials = new SmartyCore.SharedCredentials(key);

// The appropriate license values to be used for your subscriptions
// can be found on the Subscription page of the account dashboard.
// https://www.smarty.com/docs/cloud/licensing
let clientBuilder = new SmartyCore.ClientBuilder(credentials).withLicenses(["us-reverse-geocoding-cloud"]);
	// .withBaseUrl("YOUR URL") // withBaseUrl() should be used if you are self-hosting the Smarty API
let client = clientBuilder.buildUsReverseGeoClient();

let lookup1 = new Lookup(40.27644, -111.65747);
// uncomment the following line to add a custom parameter
// lookup1.addCustomParameter("source", "all");

await handleResponse(lookup1);

function displayResult(result) {
	console.log(result.response.results[0].address);
}

function handleError(error) {
	console.log("ERROR:", error);
}

async function handleResponse(lookup) {
	try {
		const result = await client.send(lookup);
		displayResult(result);
	} catch(err) {
		handleError(err);
	}
}

const SmartySDK = require("../dist/cjs/index.cjs");
const SmartyCore = SmartySDK.core;
const Lookup = SmartySDK.usStreet.Lookup;

// for Server-to-server requests, use this code:
// let authId = process.env.SMARTY_AUTH_ID;
// let authToken = process.env.SMARTY_AUTH_TOKEN;
// const credentials = new SmartyCore.StaticCredentials(authId, authToken);

// for client-side requests (browser/mobile), use this code:
// Note: key must be a string
let key = "your key";
const credentials = new SmartyCore.SharedCredentials(key);

// The appropriate license values to be used for your subscriptions
// can be found on the Subscription page of the account dashboard.
// https://www.smarty.com/docs/cloud/licensing
let clientBuilder = new SmartyCore.ClientBuilder(credentials).withLicenses(["us-rooftop-geocoding-cloud"]);
	// .withBaseUrl("YOUR URL") // withBaseUrl() should be used if you are self-hosting the Smarty API

let client = clientBuilder.buildUsStreetApiClient();

// Documentation for input fields can be found at:
// https://www.smarty.com/docs/us-street-api#input-fields

let lookup1 = new Lookup();
lookup1.street = "805 Tye Crossing Ct";
lookup1.city = "Burleson";
lookup1.state = "TX";
lookup1.zipCode = "76028";
lookup1.candidates = 10;
lookup1.match = "enhanced";
// lookup1.countySource = "geographic";

(async () => {
	await handleResponse(lookup1);
})();

function handleSuccess(response) {
	response.lookups.map(lookup => console.log(lookup.result));
}

function handleError(response) {
	console.log(response);
}

async function handleResponse(lookup) {
	try {
		const result = await client.send(lookup);
		handleSuccess(result);
	} catch(err) {
		handleError(err);
	}
}
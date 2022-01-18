const SmartySDK = require("smartystreets-javascript-sdk");
const SmartyCore = SmartySDK.core;
const Lookup = SmartySDK.internationalStreet.Lookup;

// for Server-to-server requests, use this code:
// let authId = process.env.SMARTY_AUTH_ID;
// let authToken = process.env.SMARTY_AUTH_TOKEN;
// const credentials = new SmartyCore.StaticCredentials(authId, authToken);

// for client-side requests (browser/mobile), use this code:
let key = process.env.SMARTY_WEBSITE_KEY;
const credentials = new SmartyCore.SharedCredentials(key);

// The appropriate license values to be used for your subscriptions
// can be found on the Subscription page of the account dashboard.
// https://www.smarty.com/docs/cloud/licensing
let clientBuilder = new SmartyCore.ClientBuilder(credentials).withLicenses(["international-global-plus-cloud"]);
let client = clientBuilder.buildInternationalStreetClient();

// Documentation for input fields can be found at:
// https://www.smarty.com/docs/cloud/international-street-api#http-input-fields

let lookup1 = new Lookup("CA", "262 Browndale Cr, Richmond Hill, ON");

let lookup2 = new Lookup();
lookup2.inputId = "ID-8675309";
lookup2.geocode = false;
lookup2.organization = "John Doe";
lookup2.address1 = "Rua Padre Antonio D'Angelo 121";
lookup2.address2 = "Casa Verde";
lookup2.locality = "Sao Paulo";
lookup2.administrativeArea = "SP";
lookup2.country = "Brazil";
lookup2.postalCode = "02516-050";

await handleRequest(lookup1)
await handleRequest(lookup2)

function displayResult(result) {
	console.log(result.result[0].components);
}

function handleError(error) {
	console.log("ERROR:", error);
}

async function handleRequest(lookup) {
	try {
		const result = await client.send(lookup);
		displayResult(result);
	} catch(err) {
		handleError(err);
	}
}
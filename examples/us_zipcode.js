const SmartySDK = require("smartystreets-javascript-sdk");
const SmartyCore = SmartySDK.core;
const Lookup = SmartySDK.usZipcode.Lookup;

// for Server-to-server requests, use this code:
// let authId = process.env.SMARTY_AUTH_ID;
// let authToken = process.env.SMARTY_AUTH_TOKEN;
// const credentials = new SmartyCore.StaticCredentials(authId, authToken);

// for client-side requests (browser/mobile), use this code:
let key = process.env.SMARTY_WEBSITE_KEY;
const credentials = new SmartyCore.SharedCredentials(key);

let clientBuilder = new SmartyCore.ClientBuilder(credentials);
	// .withBaseUrl("");
let client = clientBuilder.buildUsZipcodeClient();

// Documentation for input fields can be found at:
// https://www.smarty.com/docs/us-zipcode-api#input-fields

let lookup1 = new Lookup();
lookup1.inputId = "01189998819991197253"; // Optional ID from your system
lookup1.zipCode = "49786";

let lookup2 = new Lookup();
lookup2.inputId = "dfc33cb6-829e-4fea-aa1b-b6d6580f0817";
lookup2.city = "Provo";
lookup2.state = "UT";
lookup2.zipCode = "84604";

let lookup3 = new Lookup();
lookup3.city = "Phoenix";
lookup3.state = "AZ";

let batch = new SmartyCore.Batch();
batch.add(lookup1);
batch.add(lookup2);
batch.add(lookup3);

await handleResponse(batch);

function viewResults(response) {
	response.lookups.map(lookup => lookup.result.map(candidate => {
		candidate.cities.map(city => console.log(city.city));
		// candidate.zipcodes.map(zipcode => console.log(zipcode.zipcode));
	}));
}

async function handleResponse(lookup) {
	try {
		const result = await client.send(lookup);
		viewResults(result);
	} catch(err) {
		console.log(err);
	}
}
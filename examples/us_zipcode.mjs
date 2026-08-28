import SmartySDK from "smartystreets-javascript-sdk";

const SmartyCore = SmartySDK.core;
const Lookup = SmartySDK.usZipcode.Lookup;

// Batch requests are sent via HTTP POST. Embedded keys are restricted to GET, so
// batches require secret keys: https://www.smarty.com/docs/cloud/authentication
let authId = process.env.SMARTY_AUTH_ID;
let authToken = process.env.SMARTY_AUTH_TOKEN;
const credentials = new SmartyCore.BasicAuthCredentials(authId, authToken);

let clientBuilder = new SmartyCore.ClientBuilder(credentials);
// .withBaseUrl("YOUR URL") // withBaseUrl() should be used if you are self-hosting the Smarty API

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

// uncomment the following line to add a custom parameter
// lookup3.addCustomParameter("input_id", 1234);

// NOTE: batch requests require secret keys; embedded keys cannot be used here.
let batch = new SmartyCore.Batch();
batch.add(lookup1);
batch.add(lookup2);
batch.add(lookup3);

await handleResponse(batch);

function viewResults(response) {
	response.lookups.map((lookup) =>
		lookup.result.map((candidate) => {
			candidate.cities.map((city) => console.log(city.city));
			// candidate.zipcodes.map(zipcode => console.log(zipcode.zipcode));
		}),
	);
}

async function handleResponse(lookup) {
	try {
		const result = await client.send(lookup);
		viewResults(result);
	} catch (err) {
		console.log(err);
	}
}

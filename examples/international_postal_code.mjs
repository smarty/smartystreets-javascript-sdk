import SmartySDK from "smartystreets-javascript-sdk";

const SmartyCore = SmartySDK.core;
const Lookup = SmartySDK.internationalPostalCode.Lookup;

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
let clientBuilder = new SmartyCore.ClientBuilder(credentials);
// .withBaseUrl("YOUR URL") // withBaseUrl() should be used if you are self-hosting the Smarty API
let client = clientBuilder.buildInternationalPostalCodeClient();

// Documentation for input fields can be found at:
// https://www.smarty.com/docs/cloud/international-postal-code-api#input-fields

// Lookup by postal code and country
let lookup1 = new Lookup("Australia", "2776");
// uncomment the following line to add a custom parameter
// lookup1.addCustomParameter("input_id", 1234);

// Lookup by locality, administrative area, and country
let lookup2 = new Lookup("Brazil", null, "SP", "Sao Paulo", "ID-8675309");

await handleResponse(lookup1, "Postal code lookup");
await handleResponse(lookup2, "Locality and administrative area lookup");

function displayResult(lookup, message) {
	console.log("*** " + message + " ***");
	if (lookup.result && lookup.result.length > 0) {
		lookup.result.forEach((result) => {
			console.log("Input ID:", result.inputId);
			console.log("Administrative Area:", result.administrativeArea);
			console.log("Super Administrative Area:", result.superAdministrativeArea);
			console.log("Sub Administrative Area:", result.subAdministrativeArea);
			console.log("Locality:", result.locality);
			console.log("Dependent Locality:", result.dependentLocality);
			console.log("Dependent Locality Name:", result.dependentLocalityName);
			console.log("Double Dependent Locality:", result.doubleDependentLocality);
			console.log("Postal Code:", result.postalCode);
			console.log("Postal Code Extra:", result.postalCodeExtra);
			console.log("Country ISO3:", result.countryIso3);
			console.log("---");
		});
	} else {
		console.log("No results found");
	}
	console.log("\n");
}

function handleError(error) {
	console.log("ERROR:", error);
}

async function handleResponse(lookup, lookupType) {
	try {
		const result = await client.send(lookup);
		displayResult(result, lookupType);
	} catch (err) {
		handleError(err);
	}
}

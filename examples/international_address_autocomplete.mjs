import SmartySDK from "smartystreets-javascript-sdk";

const SmartyCore = SmartySDK.core;
const Lookup = SmartySDK.internationalAddressAutocomplete.Lookup;

// for client-side requests (browser/mobile), use this code:
// const key = process.env.SMARTY_EMBEDDED_KEY;
// const credentials = new SmartyCore.SharedCredentials(key);

// for Server-to-server requests, use this code:
const authId = process.env.SMARTY_AUTH_ID;
const authToken = process.env.SMARTY_AUTH_TOKEN;
const credentials = new SmartyCore.BasicAuthCredentials(authId, authToken);

// The appropriate license values to be used for your subscriptions
// can be found on the Subscription page of the account dashboard.
// https://www.smarty.com/docs/cloud/licensing
const clientBuilder = new SmartyCore.ClientBuilder(credentials).withLicenses(["international-autocomplete-v2-cloud"])
	// .withBaseUrl("YOUR URL") // withBaseUrl() should be used if you are self-hosting the Smarty API

const client = clientBuilder.buildInternationalAddressAutocompleteClient();

// Documentation for input fields can be found at:
// www.smarty.com/docs/cloud/international-address-autocomplete-api#pro-http-request-input-fields
const country = "CAN";

const summaryLookup = new Lookup({search: "123 Anson", country});
// uncomment the following line to add a custom parameter
// summaryLookup.addCustomParameter("max_results", 1);

await handleRequest(summaryLookup, "Response of summary results");

const detailedLookup = new Lookup({addressId: summaryLookup.result[0].addressId, country});
await handleRequest(detailedLookup, "Response using an address ID to get detailed results");

function logSuggestions(response, message) {
	console.log("*** " + message + " ***");

	response.result.forEach(suggestion => {
		if (suggestion.addressText) {
			console.log("Entries: ", suggestion.entries);
			console.log("Address Text: ", suggestion.addressText);
			console.log("Address ID: ", suggestion.addressId);
		} else {
			console.log("Street: ", suggestion.street);
			console.log("Locality: ", suggestion.locality);
			console.log("Administrative Area: ", suggestion.administrativeArea);
			console.log("Postal Code: ", suggestion.postalCode);
			console.log("Country: ", suggestion.countryIso3);
		}
	});
	console.log("\n");
}

async function handleRequest(lookup, lookupType) {
	try {
		const results = await client.send(lookup);
		logSuggestions(results, lookupType);
	} catch(err) {
		console.log(err)
	}
}
import { ClientBuilder, BasicAuthCredentials, LookupInternationalAddressAutocomplete } from "smartystreets-javascript-sdk";

// for client-side requests (browser/mobile), use this code:
// import { SharedCredentials } from "smartystreets-javascript-sdk";
// const key: string = process.env.SMARTY_EMBEDDED_KEY!;
// const credentials = new SharedCredentials(key);

// for Server-to-server requests, use this code:
const authId = process.env.SMARTY_AUTH_ID!;
const authToken = process.env.SMARTY_AUTH_TOKEN!;
const credentials = new BasicAuthCredentials(authId, authToken);

// The appropriate license values to be used for your subscriptions
// can be found on the Subscription page of the account dashboard.
// https://www.smarty.com/docs/cloud/licensing
const clientBuilder = new ClientBuilder(credentials);
// .withBaseUrl("YOUR URL") // withBaseUrl() should be used if you are self-hosting the Smarty API

const client = clientBuilder.buildInternationalAddressAutocompleteClient();

// Documentation for input fields can be found at:
// www.smarty.com/docs/cloud/international-address-autocomplete-api#pro-http-request-input-fields
const country = "CAN";

function logSuggestions(response: LookupInternationalAddressAutocomplete, message: string): void {
	console.log("*** " + message + " ***");

	response.result.forEach((suggestion) => {
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

async function handleRequest(lookup: LookupInternationalAddressAutocomplete, lookupType: string): Promise<void> {
	try {
		const results = await client.send(lookup);
		logSuggestions(results, lookupType);
	} catch (err: unknown) {
		console.error(err);
	}
}

async function main(): Promise<void> {
	const summaryLookup = new LookupInternationalAddressAutocomplete({
		search: "123 Anson",
		country,
		maxGroupResults: 50,
		geolocation: true,
	});

	await handleRequest(summaryLookup, "Response of summary results");

	const detailedLookup = new LookupInternationalAddressAutocomplete({
		addressId: summaryLookup.result[0].addressId,
		country,
	});
	await handleRequest(detailedLookup, "Response using an address ID to get detailed results");
}

main();

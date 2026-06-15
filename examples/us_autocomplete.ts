import {
	ClientBuilder,
	BasicAuthCredentials,
	LookupUSAutocomplete,
} from "smartystreets-javascript-sdk";

// This example is for US Autocomplete (V2). It has the same name as a previous product
// which has been deprecated since 2022, which we refer to as US Autocomplete Basic.
// If you are still using US Autocomplete Basic, this SDK will not work.

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

const client = clientBuilder.buildUsAutocompleteClient();

// Documentation for input fields can be found at:
// https://www.smarty.com/docs/apis/us-autocomplete-v2/reference#http-request-input-fields

// ************************************************

function logSuggestions(response: LookupUSAutocomplete, message: string): void {
	console.log(message);
	console.log(response.result);
	console.log("*********************");
}

async function handleRequest(lookup: LookupUSAutocomplete, lookupType: string): Promise<void> {
	try {
		const results = await client.send(lookup);
		logSuggestions(results, lookupType);
	} catch (err: unknown) {
		console.error(err);
	}
}

async function main(): Promise<void> {
	// *** Simple Lookup ***
	let lookup = new LookupUSAutocomplete("4770 Lincoln");
	// uncomment the following line to add a custom parameter
	// lookup.addCustomParameter("max_results", "3");

	await handleRequest(lookup, "Simple Lookup");

	// *** Using Filter and Prefer ***
	lookup = new LookupUSAutocomplete("4770 Lincoln");

	lookup.maxResults = 10;
	lookup.includeOnlyCities = ["Chicago,La Grange,IL", "Blaine,WA"];
	lookup.preferStates = ["IL"];
	lookup.preferRatio = 33;
	lookup.source = "all";

	await handleRequest(lookup, "Using Filter and Prefer");

	// *** Using 'selected' to Expand Secondaries ***
	// Take an entry_id from a previous result that has secondaries and pass it back as the selected address.
	const entryId = lookup.result.find((suggestion) => suggestion.entryId)?.entryId;
	if (entryId) {
		lookup = new LookupUSAutocomplete("4770 Lincoln");
		lookup.selected = entryId;
		await handleRequest(lookup, "Using 'selected' to Expand Secondaries");
	}
}

main();

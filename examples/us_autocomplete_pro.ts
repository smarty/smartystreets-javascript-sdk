import {
	ClientBuilder,
	BasicAuthCredentials,
	LookupUSAutocompletePro,
} from "smartystreets-javascript-sdk";

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

const client = clientBuilder.buildUsAutocompleteProClient();

// Documentation for input fields can be found at:
// https://www.smarty.com/docs/cloud/us-autocomplete-api#pro-http-request-input-fields

// ************************************************

function logSuggestions(response: LookupUSAutocompletePro, message: string): void {
	console.log(message);
	console.log(response.result);
	console.log("*********************");
}

async function handleRequest(lookup: LookupUSAutocompletePro, lookupType: string): Promise<void> {
	try {
		const results = await client.send(lookup);
		logSuggestions(results, lookupType);
	} catch (err: unknown) {
		console.error(err);
	}
}

async function main(): Promise<void> {
	// *** Simple Lookup ***
	let lookup = new LookupUSAutocompletePro("4770 Lincoln");
	// uncomment the following line to add a custom parameter
	// lookup.addCustomParameter("max_results", "3");

	await handleRequest(lookup, "Simple Lookup");

	// *** Using Filter and Prefer ***
	lookup = new LookupUSAutocompletePro("4770 Lincoln");

	lookup.maxResults = 10;
	lookup.includeOnlyCities = ["Chicago,La Grange,IL", "Blaine,WA"];
	lookup.preferStates = ["IL"];
	lookup.preferRatio = 33;
	lookup.source = "all";

	await handleRequest(lookup, "Using Filter and Prefer");

	// *** Using 'selected' to Expand Secondaries ***
	lookup = new LookupUSAutocompletePro("4770 Lincoln");

	lookup.selected = "4770 N Lincoln Ave Ste 2 (3) Chicago, IL 60625";

	await handleRequest(lookup, "Using 'selected' to Expand Secondaries");
}

main();

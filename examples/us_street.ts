import { ClientBuilder, BasicAuthCredentials, LookupUSStreet, Batch } from "smartystreets-javascript-sdk";

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

const client = clientBuilder.buildUsStreetApiClient();

// Documentation for input fields can be found at:
// https://www.smarty.com/docs/us-street-api#input-fields

function handleSuccess(response: Batch): void {
	response.lookups.forEach((lookup) => console.log(lookup.result));
}

async function handleResponse(batch: Batch): Promise<void> {
	try {
		const result = await client.send(batch);
		handleSuccess(result);
	} catch (err: unknown) {
		console.error(err);
	}
}

async function main(): Promise<void> {
	const lookup1 = new LookupUSStreet();
	lookup1.inputId = "24601"; // Optional ID from your system
	lookup1.addressee = "John Doe";
	lookup1.street = "330 N 100 W";
	lookup1.street2 = "closet under the stairs";
	lookup1.secondary = "APT 2";
	lookup1.urbanization = ""; // Only applies to Puerto Rico addresses
	lookup1.city = "Provo";
	lookup1.state = "Utah";
	lookup1.zipCode = "84601";
	lookup1.maxCandidates = 3;
	lookup1.match = "enhanced"; // The API will return detailed output based on a more aggressive matching mechanism. It also includes a more comprehensive address dataset beyond just the postal address data. Requires a US Core license or a US Rooftop Geocoding license.
	// Refer to the documentation for additional MatchStrategy options.

	const lookup2 = new LookupUSStreet();
	lookup2.street = "1600 Amphitheater Pkwy";
	lookup2.lastLine = "Mountainview, CA";
	lookup2.maxCandidates = 5;

	const lookup3 = new LookupUSStreet();
	lookup3.inputId = "8675309";
	lookup3.street = "1600 Amphitheatre Parkway Mountain View, CA 94043";

	// uncomment the following line to add a custom parameter
	// lookup3.addCustomParameter("max_candidates", 1);

	// NOTE: batches are not supported when using SharedCredentials.
	const batch = new Batch();
	batch.add(lookup1);
	batch.add(lookup2);
	batch.add(lookup3);

	await handleResponse(batch);
}

main();

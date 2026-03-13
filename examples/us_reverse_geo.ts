import { ClientBuilder, BasicAuthCredentials, LookupUSReverseGeo } from "smartystreets-javascript-sdk";

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
const client = clientBuilder.buildUsReverseGeoClient();

function displayResult(result: LookupUSReverseGeo): void {
	console.log(result.response.results[0].address);
}

async function handleResponse(lookup: LookupUSReverseGeo): Promise<void> {
	try {
		const result = await client.send(lookup);
		displayResult(result);
	} catch (err: unknown) {
		console.error("ERROR:", err);
	}
}

async function main(): Promise<void> {
	const lookup = new LookupUSReverseGeo(40.27644, -111.65747);
	// uncomment the following line to add a custom parameter
	// lookup.addCustomParameter("source", "all");

	await handleResponse(lookup);
}

main();

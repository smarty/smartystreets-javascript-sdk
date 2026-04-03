import {
	ClientBuilder,
	BasicAuthCredentials,
	LookupUSEnrichment,
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

const client = clientBuilder.buildUsEnrichmentClient();

// Documentation for input fields can be found at:
// https://www.smarty.com/docs/us-street-api#input-fields

async function main(): Promise<void> {
	const lookup = new LookupUSEnrichment("334968275");
	// uncomment the following line to add a custom parameter
	// lookup.addCustomParameter("include", "group_financial");

	try {
		const result = await client.sendPrincipal(lookup);
		console.log(result.response);
	} catch (err: unknown) {
		console.error(err);
	}
}

main();

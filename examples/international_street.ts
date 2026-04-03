import {
	ClientBuilder,
	BasicAuthCredentials,
	LookupInternationalStreet,
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

const client = clientBuilder.buildInternationalStreetClient();

// Documentation for input fields can be found at:
// https://www.smarty.com/docs/cloud/international-street-api#http-input-fields

function displayResult(result: LookupInternationalStreet): void {
	console.log(result.result[0].components);
}

async function handleRequest(lookup: LookupInternationalStreet): Promise<void> {
	try {
		const result = await client.send(lookup);
		displayResult(result);
	} catch (err: unknown) {
		console.error("ERROR:", err);
	}
}

async function main(): Promise<void> {
	const lookup1 = new LookupInternationalStreet("CA", "262 Browndale Cr, Richmond Hill, ON");
	// uncomment the following line to add a custom parameter
	// lookup1.addCustomParameter("input_id", 1234);

	const lookup2 = new LookupInternationalStreet();
	lookup2.inputId = "ID-8675309";
	lookup2.organization = "John Doe";
	lookup2.address1 = "Rua Padre Antonio D'Angelo 121";
	lookup2.address2 = "Casa Verde";
	lookup2.locality = "Sao Paulo";
	lookup2.administrativeArea = "SP";
	lookup2.country = "Brazil";
	lookup2.postalCode = "02516-050";

	await handleRequest(lookup1);
	await handleRequest(lookup2);
}

main();

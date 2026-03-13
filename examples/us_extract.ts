import { ClientBuilder, BasicAuthCredentials, LookupUSExtract } from "smartystreets-javascript-sdk";

// for client-side requests (browser/mobile), use this code:
// import { SharedCredentials } from "smartystreets-javascript-sdk";
// const key: string = process.env.SMARTY_EMBEDDED_KEY!;
// const credentials = new SharedCredentials(key);

// for Server-to-server requests, use this code:
const authId = process.env.SMARTY_AUTH_ID!;
const authToken = process.env.SMARTY_AUTH_TOKEN!;
const credentials = new BasicAuthCredentials(authId, authToken);

const clientBuilder = new ClientBuilder(credentials);
// .withBaseUrl("YOUR URL") // withBaseUrl() should be used if you are self-hosting the Smarty API

const client = clientBuilder.buildUsExtractClient();

// Documentation for input fields can be found at:
// https://www.smarty.com/docs/cloud/us-extract-api#http-request-input-fields

function logResult(response: LookupUSExtract): void {
	console.log(response.result);
}

async function handleRequest(lookup: LookupUSExtract): Promise<void> {
	try {
		const response = await client.send(lookup);
		logResult(response);
	} catch (err: unknown) {
		console.error(err);
	}
}

async function main(): Promise<void> {
	const lookup = new LookupUSExtract(
		"If you work at 1600 Pennsylvania Ave NW, Washington DC you're gonna have a hard time.",
	);
	lookup.aggressive = true;
	lookup.addressesHaveLineBreaks = false;
	lookup.addressesPerLine = 1;

	// uncomment the following line to add a custom parameter
	// lookup.addCustomParameter("addr_line_breaks", false);

	await handleRequest(lookup);
}

main();

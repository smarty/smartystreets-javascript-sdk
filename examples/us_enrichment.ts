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

// Different smartyKeys illustrate different datasets best. 334968275 is a
// single-family parcel (good for property/financial/geo); 1106658436 is an
// apartment complex with hundreds of units (good for secondary endpoints).
const propertyKey = "334968275";
const multiUnitKey = "1106658436";

type SendFn = (lookup: LookupUSEnrichment) => Promise<LookupUSEnrichment>;

const datasets: Array<[string, string, SendFn]> = [
	["Principal", propertyKey, (l) => client.sendPrincipal(l)],
	["Financial", propertyKey, (l) => client.sendFinancial(l)],
	["Geo-Reference", propertyKey, (l) => client.sendGeo(l)],
	["Secondary", multiUnitKey, (l) => client.sendSecondary(l)],
	["Secondary Count", multiUnitKey, (l) => client.sendSecondaryCount(l)],
];

async function main(): Promise<void> {
	for (const [label, key, send] of datasets) {
		console.log(`\n=== ${label} (${key}) ===`);
		try {
			const result = await send(new LookupUSEnrichment(key));
			console.log(result.response);
		} catch (err: unknown) {
			const message = err instanceof Error ? err.message : String(err);
			console.error(`[${label}] failed:`, message);
		}
	}
}

main();

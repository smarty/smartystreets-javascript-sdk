import SmartySDK from "smartystreets-javascript-sdk";

const SmartyCore = SmartySDK.core;
const Lookup = SmartySDK.usEnrichment.Lookup;

// for client-side requests (browser/mobile), use this code:
// let key = process.env.SMARTY_EMBEDDED_KEY;
// const credentials = new SmartyCore.SharedCredentials(key);

// for Server-to-server requests, use this code:
let authId = process.env.SMARTY_AUTH_ID;
let authToken = process.env.SMARTY_AUTH_TOKEN;
const credentials = new SmartyCore.BasicAuthCredentials(authId, authToken);

// The appropriate license values to be used for your subscriptions
// can be found on the Subscription page of the account dashboard.
// https://www.smarty.com/docs/cloud/licensing
let clientBuilder = new SmartyCore.ClientBuilder(credentials);
// .withBaseUrl("YOUR URL") // withBaseUrl() should be used if you are self-hosting the Smarty API

let client = clientBuilder.buildUsEnrichmentClient();

// Different smartyKeys illustrate different datasets best. 334968275 is a
// single-family parcel (good for property/financial/geo); 1106658436 is an
// apartment complex with hundreds of units (good for secondary endpoints).
const propertyKey = "334968275";
const multiUnitKey = "1106658436";

const datasets = [
	["Principal", propertyKey, (l) => client.sendPrincipal(l)],
	["Financial", propertyKey, (l) => client.sendFinancial(l)],
	["Geo-Reference", propertyKey, (l) => client.sendGeo(l)],
	["Secondary", multiUnitKey, (l) => client.sendSecondary(l)],
	["Secondary Count", multiUnitKey, (l) => client.sendSecondaryCount(l)],
];

async function main() {
	for (const [label, key, send] of datasets) {
		console.log(`\n=== ${label} (${key}) ===`);
		try {
			const result = await send(new Lookup(key));
			console.log(result.response);
		} catch (err) {
			console.error(`[${label}] failed:`, err?.message ?? err);
		}
	}
}

main().catch((err) => console.error(err));

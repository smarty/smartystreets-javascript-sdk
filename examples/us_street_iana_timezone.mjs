import SmartySDK from "smartystreets-javascript-sdk";

const SmartyCore = SmartySDK.core;
const Lookup = SmartySDK.usStreet.Lookup;

let authId = process.env.SMARTY_AUTH_ID;
let authToken = process.env.SMARTY_AUTH_TOKEN;
const credentials = new SmartyCore.BasicAuthCredentials(authId, authToken);

let clientBuilder = new SmartyCore.ClientBuilder(credentials).withFeatureIANATimeZone();

let client = clientBuilder.buildUsStreetApiClient();

let lookup = new Lookup();
lookup.street = "330 N 100 W";
lookup.city = "Provo";
lookup.state = "Utah";
lookup.zipCode = "84601";
lookup.match = "enhanced";
lookup.maxCandidates = 1;

try {
	const response = await client.send(lookup);
	const candidate = response.lookups[0].result[0];
	const metadata = candidate.metadata;

	console.log("Standard timezone fields:");
	console.log(`  timeZone:    ${metadata.timeZone}`);
	console.log(`  utcOffset:   ${metadata.utcOffset}`);
	console.log(`  obeysDst:    ${metadata.obeysDst}`);

	console.log("IANA timezone fields:");
	console.log(`  ianaTimeZone:  ${metadata.ianaTimeZone}`);
	console.log(`  ianaUtcOffset: ${metadata.ianaUtcOffset}`);
	console.log(`  ianaDst:       ${metadata.ianaDst}`);
} catch (err) {
	console.log(err);
}

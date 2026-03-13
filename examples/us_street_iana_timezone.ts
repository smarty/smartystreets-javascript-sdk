import { ClientBuilder, BasicAuthCredentials, LookupUSStreet } from "smartystreets-javascript-sdk";
import type { CandidateUSStreet } from "smartystreets-javascript-sdk";

const authId = process.env.SMARTY_AUTH_ID!;
const authToken = process.env.SMARTY_AUTH_TOKEN!;
const credentials = new BasicAuthCredentials(authId, authToken);

const clientBuilder = new ClientBuilder(credentials).withFeatureIANATimeZone();

const client = clientBuilder.buildUsStreetApiClient();

async function main(): Promise<void> {
	const lookup = new LookupUSStreet();
	lookup.street = "330 N 100 W";
	lookup.city = "Provo";
	lookup.state = "Utah";
	lookup.zipCode = "84601";
	lookup.match = "enhanced";
	lookup.maxCandidates = 1;

	try {
		const response = await client.send(lookup);
		const candidate = response.lookups[0].result[0] as CandidateUSStreet;
		const metadata = candidate.metadata;

		console.log("Standard timezone fields:");
		console.log(`  timeZone:    ${metadata.timeZone}`);
		console.log(`  utcOffset:   ${metadata.utcOffset}`);
		console.log(`  obeysDst:    ${metadata.obeysDst}`);

		console.log("IANA timezone fields:");
		console.log(`  ianaTimeZone:  ${metadata.ianaTimeZone}`);
		console.log(`  ianaUtcOffset: ${metadata.ianaUtcOffset}`);
		console.log(`  ianaDst:       ${metadata.ianaDst}`);
	} catch (err: unknown) {
		console.error(err);
	}
}

main();

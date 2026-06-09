import {
	ClientBuilder,
	BasicAuthCredentials,
	BusinessSummaryLookup,
	BusinessDetailLookup,
	NotModifiedError,
} from "smartystreets-javascript-sdk";

const authId = process.env.SMARTY_AUTH_ID!;
const authToken = process.env.SMARTY_AUTH_TOKEN!;
const credentials = new BasicAuthCredentials(authId, authToken);

const client = new ClientBuilder(credentials).buildUsEnrichmentClient();

async function main(): Promise<void> {
	const summaryLookup = new BusinessSummaryLookup();
	summaryLookup.businessName = "delta air";
	summaryLookup.city = "atlanta";

	const summary = await client.sendBusinessSummary(summaryLookup);
	const firstResult = summary.results?.[0];
	if (!firstResult || firstResult.businesses.length === 0) {
		console.log("No businesses found for this business-name search");
		return;
	}

	for (const entry of firstResult.businesses) {
		console.log(`${entry.businessId}\t${entry.companyName}`);
	}

	const firstBusinessId = firstResult.businesses[0]!.businessId!;
	const detailLookup = new BusinessDetailLookup(firstBusinessId);
	const detail = await client.sendBusinessDetail(detailLookup);
	console.log("\n--- Detail for", firstBusinessId, "---");
	console.log(detail.result);
}

main().catch((err) => console.error(err));

import SmartySDK from "smartystreets-javascript-sdk";

const SmartyCore = SmartySDK.core;
const { BusinessSummaryLookup, BusinessDetailLookup } = SmartySDK.usEnrichment;

const authId = process.env.SMARTY_AUTH_ID;
const authToken = process.env.SMARTY_AUTH_TOKEN;
const credentials = new SmartyCore.BasicAuthCredentials(authId, authToken);

const client = new SmartyCore.ClientBuilder(credentials).buildUsEnrichmentClient();

async function main() {
	const smartyKey = "334968275";

	const summaryLookup = new BusinessSummaryLookup(smartyKey);
	const summary = await client.sendBusinessSummary(summaryLookup);
	const firstResult = summary.results?.[0];
	if (!firstResult || firstResult.businesses.length === 0) {
		console.log("No businesses found for smartyKey", smartyKey);
		return;
	}

	for (const entry of firstResult.businesses) {
		console.log(`${entry.businessId}\t${entry.companyName}`);
	}

	const firstBusinessId = firstResult.businesses[0].businessId;
	const detailLookup = new BusinessDetailLookup(firstBusinessId);
	const detail = await client.sendBusinessDetail(detailLookup);
	console.log("\n--- Detail for", firstBusinessId, "---");
	console.log(detail.result);
}

main().catch((err) => console.error(err));

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

async function demoSummaryEtag(smartyKey: string): Promise<void> {
	console.log("\n=== Summary ETag round-trip ===");

	const first = new BusinessSummaryLookup(smartyKey);
	await client.sendBusinessSummary(first);
	const capturedEtag = first.responseEtag;
	console.log("First call captured responseEtag:", capturedEtag);

	if (!capturedEtag) {
		console.log("Server did not return an Etag; skipping second call.");
		return;
	}

	const second = new BusinessSummaryLookup(smartyKey);
	second.requestEtag = capturedEtag;
	try {
		await client.sendBusinessSummary(second);
		console.log("Second call: 200, new responseEtag:", second.responseEtag);
	} catch (err: unknown) {
		if (err instanceof NotModifiedError) {
			console.log("Second call: 304 Not Modified; refreshed etag:", err.responseEtag);
		} else {
			throw err;
		}
	}
}

async function demoDetailEtag(businessId: string): Promise<void> {
	console.log("\n=== Detail ETag round-trip ===");

	const first = new BusinessDetailLookup(businessId);
	await client.sendBusinessDetail(first);
	console.log("First call captured responseEtag:", first.responseEtag);

	if (!first.responseEtag) return;

	const second = new BusinessDetailLookup(businessId);
	second.requestEtag = first.responseEtag;
	try {
		await client.sendBusinessDetail(second);
		console.log("Second call: 200, new responseEtag:", second.responseEtag);
	} catch (err: unknown) {
		if (err instanceof NotModifiedError) {
			console.log("Second call: 304 Not Modified; refreshed etag:", err.responseEtag);
		} else {
			throw err;
		}
	}
}

async function main(): Promise<void> {
	const smartyKey = "334968275";
	await demoSummaryEtag(smartyKey);

	const summary = new BusinessSummaryLookup(smartyKey);
	await client.sendBusinessSummary(summary);
	const firstBusinessId = summary.results?.[0]?.businesses?.[0]?.businessId;
	if (firstBusinessId) await demoDetailEtag(firstBusinessId);
}

main().catch((err) => console.error(err));

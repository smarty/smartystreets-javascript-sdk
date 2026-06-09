import SmartySDK from "smartystreets-javascript-sdk";

const SmartyCore = SmartySDK.core;
const Lookup = SmartySDK.usStreet.Lookup;

// for client-side requests (browser/mobile), use this code:
// let key = process.env.SMARTY_EMBEDDED_KEY;
// const credentials = new SmartyCore.SharedCredentials(key);

// for Server-to-server requests, use this code:
let authId = process.env.SMARTY_AUTH_ID;
let authToken = process.env.SMARTY_AUTH_TOKEN;
const credentials = new SmartyCore.BasicAuthCredentials(authId, authToken);

let client = new SmartyCore.ClientBuilder(credentials).buildUsStreetApiClient();

// Each address is run through all three match strategies so you can compare how
// 'strict', 'enhanced', and 'invalid' each handle a valid, an invalid, and an
// ambiguous address.
//   - strict:   only returns candidates that are valid, mailable addresses.
//   - enhanced: returns a more comprehensive dataset (requires a US Core or Rooftop license).
//   - invalid:  most permissive; always returns at least one candidate (a best-guess standardization).
// Documentation for input fields: https://www.smarty.com/docs/us-street-api#input-fields
const addresses = [
	{ label: "valid (real, deliverable)", street: "1600 Amphitheatre Pkwy", city: "Mountain View", state: "CA", zip: "94043" },
	{ label: "invalid (no such address)", street: "9999 W 1150 S", city: "Provo", state: "UT", zip: "84601" },
	{ label: "ambiguous (missing ZIP/unit)", street: "1 Rosedale St", city: "Baltimore", state: "MD", zip: "" },
];
const strategies = ["strict", "enhanced", "invalid"];

const batch = new SmartyCore.Batch();
const cases = []; // parallel metadata for each lookup, in the order they are added to the batch

for (const address of addresses) {
	for (const strategy of strategies) {
		const lookup = new Lookup();
		lookup.street = address.street;
		lookup.city = address.city;
		lookup.state = address.state;
		lookup.zipCode = address.zip;
		lookup.match = strategy;
		lookup.maxCandidates = 10; // allow ambiguous addresses to return more than one match
		batch.add(lookup);
		cases.push({ label: address.label, address: `${address.street}, ${address.city}, ${address.state}`, strategy });
	}
}

await handleResponse(batch);

function handleSuccess(response) {
	const separator = "=".repeat(70);
	let lastAddress = "";

	response.lookups.forEach((lookup, i) => {
		const c = cases[i];

		if (c.address !== lastAddress) {
			console.log(`\n${separator}`);
			console.log(` Address: ${c.address}  [${c.label}]`);
			console.log(separator);
			lastAddress = c.address;
		}

		const candidates = lookup.result;
		console.log(`\n--- '${c.strategy}' strategy ---`);

		if (candidates.length === 0) {
			console.log("  0 candidates - no match returned under this strategy.");
			return;
		}

		console.log(`  ${candidates.length} candidate(s):`);
		candidates.forEach((candidate) => {
			console.log(`    [${candidate.candidateIndex}] ${candidate.deliveryLine1}  ${candidate.lastLine}`);
		});
	});
}

function handleError(response) {
	console.log(response);
}

async function handleResponse(lookup) {
	try {
		const result = await client.send(lookup);
		handleSuccess(result);
	} catch (err) {
		handleError(err);
	}
}

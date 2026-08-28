import {
	ClientBuilder,
	BasicAuthCredentials,
	LookupUSZipcode,
	Batch,
} from "smartystreets-javascript-sdk";

// Batch requests are sent via HTTP POST. Embedded keys are restricted to GET, so
// batches require secret keys: https://www.smarty.com/docs/cloud/authentication
const authId = process.env.SMARTY_AUTH_ID!;
const authToken = process.env.SMARTY_AUTH_TOKEN!;
const credentials = new BasicAuthCredentials(authId, authToken);

const clientBuilder = new ClientBuilder(credentials);
// .withBaseUrl("YOUR URL") // withBaseUrl() should be used if you are self-hosting the Smarty API

const client = clientBuilder.buildUsZipcodeClient();

// Documentation for input fields can be found at:
// https://www.smarty.com/docs/us-zipcode-api#input-fields

function viewResults(response: Batch): void {
	response.lookups.forEach((baseLookup) => {
		const lookup = baseLookup as LookupUSZipcode;
		lookup.result.forEach((candidate) => {
			candidate.cities.forEach((city) => console.log(city.city));
			// candidate.zipcodes.forEach(zipcode => console.log(zipcode.zipcode));
		});
	});
}

async function handleResponse(batch: Batch): Promise<void> {
	try {
		const result = await client.send(batch);
		viewResults(result);
	} catch (err: unknown) {
		console.error(err);
	}
}

async function main(): Promise<void> {
	const lookup1 = new LookupUSZipcode();
	lookup1.inputId = "01189998819991197253"; // Optional ID from your system
	lookup1.zipCode = "49786";

	const lookup2 = new LookupUSZipcode();
	lookup2.inputId = "dfc33cb6-829e-4fea-aa1b-b6d6580f0817";
	lookup2.city = "Provo";
	lookup2.state = "UT";
	lookup2.zipCode = "84604";

	const lookup3 = new LookupUSZipcode();
	lookup3.city = "Phoenix";
	lookup3.state = "AZ";

	// uncomment the following line to add a custom parameter
	// lookup3.addCustomParameter("input_id", 1234);

	// NOTE: batch requests require secret keys; embedded keys cannot be used here.
	const batch = new Batch();
	batch.add(lookup1);
	batch.add(lookup2);
	batch.add(lookup3);

	await handleResponse(batch);
}

main();

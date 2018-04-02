const SmartyStreetsSDK = require("../index");
const SmartyStreetsCore = SmartyStreetsSDK.core;
const Lookup = SmartyStreetsSDK.usZipcode.Lookup;

let authId = process.env.SMARTY_AUTH_ID;
let authToken = process.env.SMARTY_AUTH_TOKEN;

let clientBuilder = new SmartyStreetsCore.ClientBuilder(new SmartyStreetsCore.StaticCredentials(authId, authToken));
let client = clientBuilder.buildUsZipcodeClient();

let lookup1 = new Lookup();
let lookup2 = new Lookup();

lookup1.zipCode = "49786";
lookup2.city = "Phoenix";
lookup2.state = "AZ";

let batch = new SmartyStreetsCore.Batch();
batch.add(lookup1);
batch.add(lookup2);

client.sendBatch(batch)
	.then(viewResults)
	.catch(console.log);

function viewResults(response) {
	response.lookups.map(lookup => lookup.result.map(candidate => {
		candidate.cities.map(city => console.log(city.city));
		// candidate.zipcodes.map(zipcode => console.log(zipcode.zipcode));
	}));
}
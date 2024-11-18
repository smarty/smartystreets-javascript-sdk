const SmartySDK = require("../dist/cjs/index.cjs");
const SmartyCore = SmartySDK.core;
const Lookup = SmartySDK.usZipcode.Lookup;

// for Server-to-server requests, use this code:
// let authId = process.env.SMARTY_AUTH_ID;
// let authToken = process.env.SMARTY_AUTH_TOKEN;
// const credentials = new SmartyCore.StaticCredentials(authId, authToken);

// for client-side requests (browser/mobile), use this code:
let key = "your key";
const credentials = new SmartyCore.SharedCredentials(key);

let clientBuilder = new SmartyCore.ClientBuilder(credentials);
	// .withBaseUrl("YOUR URL") // withBaseUrl() should be used if you are self-hosting the Smarty API

let client = clientBuilder.buildUsZipcodeClient();

// Documentation for input fields can be found at:
// https://www.smarty.com/docs/us-zipcode-api#input-fields

let lookup1 = new Lookup();
lookup1.inputId = "01189998819991197253"; // Optional ID from your system
lookup1.city = "Provo";
lookup1.state = "Utah";

lookup1.addCustomParameter("zipcode", "84601");

(async () => {
	await handleResponse(lookup1);
})();


function viewResults(response) {
	response.lookups.map((lookup, i) => {
		console.log("zipcodes count: ", lookup.result[0].zipcodes.length) 
	})
}

async function handleResponse(lookup) {
	try {
		const result = await client.send(lookup);
		viewResults(result);
	} catch(err) {
		console.log(err);
	}
}
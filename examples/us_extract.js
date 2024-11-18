const SmartySDK = require("../dist/cjs/index.cjs");
const SmartyCore = SmartySDK.core;
const Lookup = SmartySDK.usExtract.Lookup;

// for Server-to-server requests, use this code:
let authId = process.env.SMARTY_AUTH_ID;
let authToken = process.env.SMARTY_AUTH_TOKEN;
const credentials = new SmartyCore.StaticCredentials(authId, authToken);

let clientBuilder = new SmartyCore.ClientBuilder(credentials);
	// .withBaseUrl("YOUR URL") // withBaseUrl() should be used if you are self-hosting the Smarty API

let client = clientBuilder.buildUsExtractClient();

// Documentation for input fields can be found at:
// https://www.smarty.com/docs/cloud/us-extract-api#http-request-input-fields

let lookup = new Lookup(`There are addresses everywhere.
		1109 Ninth 85007
		Smarty can find them.
		3785 Las Vegs Av.
		Los Vegas, Nevada
		That is all.`);
lookup.aggressive = true;
lookup.addressesPerLine = 1;

lookup.addCustomParameter("addr_line_breaks", false);

(async () => {
	await handleRequest(lookup);
})();

function logResult(response) {
	console.log(response.result);
}

async function handleRequest(lookup) {
	try {
		const response = await client.send(lookup); 
		logResult(response);
	} catch(err) {
		console.log(err);
	}
}
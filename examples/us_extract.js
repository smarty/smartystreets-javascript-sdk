const SmartyStreetsSDK = require("../index");
const SmartyStreetsCore = SmartyStreetsSDK.core;
const Lookup = SmartyStreetsSDK.usExtract.Lookup;

let authId = process.env.SMARTY_AUTH_ID;
let authToken = process.env.SMARTY_AUTH_TOKEN;

let clientBuilder = new SmartyStreetsCore.ClientBuilder(new SmartyStreetsCore.StaticCredentials(authId, authToken));
let client = clientBuilder.buildUsExtractClient();
let lookup = new Lookup("If you work at 1600 Pennsylvania Ave NW, Washington DC you're gonna have a hard time.");

client.send(lookup)
	.then(logResult)
	.catch(console.log);

function logResult(response) {
	console.log(response.result);
}
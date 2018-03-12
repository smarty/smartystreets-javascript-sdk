const SmartyStreetsSDK = require("../index");
const SmartyStreetsCore = SmartyStreetsSDK.core;
const Lookup = SmartyStreetsSDK.internationalStreet.Lookup;

let authId = process.env.SMARTY_AUTH_ID;
let authToken = process.env.SMARTY_AUTH_TOKEN;

let clientBuilder = new SmartyStreetsCore.ClientBuilder(new SmartyStreetsCore.StaticCredentials(authId, authToken));
let client = clientBuilder.buildInternationalStreetClient();

let lookup1 = new Lookup("CA", "262 Browndale Cr, Richmond Hill, ON");
let lookup2 = new Lookup();
lookup2.country = "Brazil";
lookup2.freeform = "Rua Padre Antonio D’Angelo 121 Casa Verde, Sao Paulo";

client.send(lookup1).then(displayResult).catch(handleError);
client.send(lookup2).then(displayResult).catch(handleError);

function displayResult(result) {
	console.log(result.result[0].components);
}

function handleError(error) {
	console.log("ERROR:", error);
}

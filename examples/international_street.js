const SmartyStreetsSDK = require("smartystreets-javascript-sdk");
const SmartyStreetsCore = SmartyStreetsSDK.core;
const Lookup = SmartyStreetsSDK.internationalStreet.Lookup;

let authId = process.env.SMARTY_AUTH_ID;
let authToken = process.env.SMARTY_AUTH_TOKEN;
const credentials = new SmartyStreetsCore.StaticCredentials(authId, authToken);

let client = SmartyStreetsCore.buildClient.internationalStreet(credentials);

// Documentation for input fields can be found at:
// https://smartystreets.com/docs/cloud/international-street-api#http-input-fields

let lookup1 = new Lookup("CA", "262 Browndale Cr, Richmond Hill, ON");

let lookup2 = new Lookup();
lookup2.inputId = "ID-8675309";
lookup2.geocode = false;
lookup2.organization = "John Doe";
lookup2.address1 = "Rua Padre Antonio D'Angelo 121";
lookup2.address2 = "Casa Verde";
lookup2.locality = "Sao Paulo";
lookup2.administrativeArea = "SP";
lookup2.country = "Brazil";
lookup2.postalCode = "02516-050";

client.send(lookup1)
	.then(displayResult)
	.catch(handleError);
client.send(lookup2)
	.then(displayResult)
	.catch(handleError);

function displayResult(result) {
	console.log(result.result[0].components);
}

function handleError(error) {
	console.log("ERROR:", error);
}

const SmartySDK = require("smartystreets-javascript-sdk");
const SmartyCore = SmartySDK.core;
const Lookup = SmartySDK.usEnrichment.Lookup;

// for Server-to-server requests, use this code:
// let authId = process.env.SMARTY_AUTH_ID;
// let authToken = process.env.SMARTY_AUTH_TOKEN;
// const credentials = new SmartyCore.StaticCredentials(authId, authToken);

// for client-side requests (browser/mobile), use this code:
let key = process.env.SMARTY_EMBEDDED_KEY;
const credentials = new SmartyCore.SharedCredentials(key);

// The appropriate license values to be used for your subscriptions
// can be found on the Subscription page of the account dashboard.
// https://www.smarty.com/docs/cloud/licensing
let clientBuilder = new SmartyCore.ClientBuilder(credentials).withLicenses([
  "us-property-data-principal-cloud",
]);
// .withBaseUrl("YOUR URL") // withBaseUrl() should be used if you are self-hosting the Smarty API

let client = clientBuilder.buildUsEnrichmentClient();

// Documentation for input fields can be found at:
// https://www.smarty.com/docs/us-street-api#input-fields

let lookup = new Lookup("334968275");

handleResponse(lookup).then();

async function handleResponse(lookup) {
  try {
    const result = await client.sendPrincipal(lookup);
    console.log(result.response);
  } catch (err) {
    console.log(err);
  }
}

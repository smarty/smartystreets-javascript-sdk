const smartystreetsCore = require("../index").core;
const Lookup = require("../index").usStreet.Lookup;

let authId = process.env.SMARTY_AUTH_ID;
let authToken = process.env.SMARTY_AUTH_TOKEN;

let clientBuilder = new smartystreetsCore.ClientBuilder(new smartystreetsCore.StaticCredentials(authId, authToken));
//Configure the Client Builder
let client = clientBuilder.buildUsStreetApiClient();

let lookup1 = new Lookup();
lookup1.street = "330 N 100 W";
lookup1.city = "Provo";
lookup1.state = "Utah";

let lookup2 = new Lookup();
lookup2.street = "1600 Amphitheater Pkwy";
lookup2.city = "Mountainview";
lookup2.state = "CA";

// client.sendLookup(lookup1).then(() => console.log(), error => console.log());

let batch = new smartystreetsCore.Batch();
batch.add(lookup1);
batch.add(lookup2);

client.sendBatch(batch).then(response => {
}, error => console.log(error));

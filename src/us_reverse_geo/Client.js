const Request = require("../Request");
const Response = require("./Response");
const buildInputData = require("../util/buildInputData");
const keyTranslationFormat = require("../util/apiToSDKKeyMap").usReverseGeo;
const {UndefinedLookupError} = require("../Errors.js");

/**
 * This client sends lookups to the Smarty US Reverse Geo API, <br>
 *     and attaches the results to the appropriate Lookup objects.
 */
class Client {
	constructor(sender) {
		this.sender = sender;
	}

	send(lookup) {
		if (typeof lookup === "undefined") throw new UndefinedLookupError();

		let request = new Request();
		request.parameters = buildInputData(lookup, keyTranslationFormat);

		return new Promise((resolve, reject) => {
			this.sender.send(request)
				.then(response => {
					if (response.error) reject(response.error);

					resolve(attachLookupResults(response, lookup));
				})
				.catch(reject);
		});

		function attachLookupResults(response, lookup) {
			lookup.response = new Response(response.payload);

			return lookup;
		}
	}
}

module.exports = Client;

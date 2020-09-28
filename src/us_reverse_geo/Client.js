const Request = require("../Request");
const SmartyResponse = require("SmartyResponse");
const buildInputData = require("../util/buildInputData");
const keyTranslationFormat = require("../util/apiToSDKKeyMap").usReverseGeo;

/**
 * This client sends lookups to the SmartyStreets US Reverse Geo API, <br>
 *     and attaches the results to the appropriate Lookup objects.
 */
class Client {
	constructor(sender) {
		this.sender = sender;
	}

	send(lookup) {
		if (typeof lookup === "undefined") throw new Errors.UndefinedLookupError();

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
			response.payload.forEach(rawData => {
				lookup.result.push(new SmartyResponse(rawData));
			});

			return lookup;
		}
	}
}

module.exports = Client;

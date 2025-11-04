const Request = require("../Request");
const Result = require("./Result");
const buildInputData = require("../util/buildInputData");
const keyTranslationFormat = require("../util/apiToSDKKeyMap").internationalPostalCode;
const { UndefinedLookupError } = require("../Errors");

/**
 * This client sends lookups to the Smarty International Postal Code API, <br>
 *     and attaches the results to the appropriate Lookup objects.
 */
class Client {
	constructor(sender) {
		this.sender = sender;
	}

	/**
	 * Sends a single lookup for validation.
	 * @param data A Lookup object
	 * @throws SmartyException
	 */
	send(lookup) {
		if (typeof lookup === "undefined") throw new UndefinedLookupError();

		let request = new Request();
		request.parameters = buildInputData(lookup, keyTranslationFormat);

		return new Promise((resolve, reject) => {
			this.sender
				.send(request)
				.then((response) => {
					if (response.error) reject(response.error);

					resolve(attachLookupResults(response, lookup));
				})
				.catch(reject);
		});

		function attachLookupResults(response, lookup) {
			if (response.payload && Array.isArray(response.payload)) {
				lookup.result = response.payload.map((r) => new Result(r));
			} else {
				lookup.result = [];
			}
			return lookup;
		}
	}
}

module.exports = Client;

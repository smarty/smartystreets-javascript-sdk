const Request = require("../Request");
const UndefinedLookupError = require("../Errors").UndefinedLookupError;
const buildInputData = require("../util/buildInputData");
const keyTranslationFormat = require("../util/apiToSDKKeyMap").usReverseGeo;

/**
 * This client sends lookups to the SmartyStreets US Street API, <br>
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

					resolve(attachLookupCandidates(response, lookup));
				})
				.catch(reject);
		});

		function attachLookupCandidates(response, lookup) {
			response.payload.map(rawCandidate => {
				lookup.result.push(new Candidate(rawCandidate));
			});

			return lookup;
		}
	}
}

module.exports = Client;

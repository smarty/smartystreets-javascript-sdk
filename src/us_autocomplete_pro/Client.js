const Errors = require("../Errors");
const Request = require("../Request");
const Suggestion = require("./Suggestion");
const buildInputData = require("../util/buildInputData");
const keyTranslationFormat = require("../util/apiToSDKKeyMap").usAutocompletePro;

/**
 * This client sends lookups to the Smarty US Autocomplete Pro API, <br>
 *     and attaches the suggestions to the appropriate Lookup objects.
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

					lookup.result = buildSuggestionsFromResponse(response.payload);
					resolve(lookup);
				})
				.catch(reject);
		});

		function buildSuggestionsFromResponse(payload) {
			if (payload.suggestions === null) return [];

			return payload.suggestions.map(suggestion => new Suggestion(suggestion));
		}
	}
}

module.exports = Client;
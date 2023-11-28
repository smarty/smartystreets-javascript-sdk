const Errors = require("../Errors");
const Request = require("../Request");
const Suggestion = require("./Suggestion");
const buildInputData = require("../util/buildInputData");
const keyTranslationFormat = require("../util/apiToSDKKeyMap").internationalAddressAutocomplete;

class Client {
	constructor(sender) {
		this.sender = sender;
	}

	send(lookup) {
		if (typeof lookup === "undefined") throw new Errors.UndefinedLookupError();

		let request = new Request();
		request.parameters = buildInputData(lookup, keyTranslationFormat);

		if (lookup.addressId) {
			request.baseUrlParam = lookup.addressId;
		}

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
			if (payload && payload.candidates === null) return [];

			return payload.candidates.map(suggestion => new Suggestion(suggestion));
		}
	}
}

module.exports = Client;
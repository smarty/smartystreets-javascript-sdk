const Errors = require("../Errors");
const Request = require("../Request");
const Suggestion = require("./Suggestion");

class Client {
	constructor(sender) {
		this.sender = sender;
	}

	send(lookup) {
		if (typeof lookup === "undefined") throw new Errors.UndefinedLookupError();

		let request = new Request();
		request.parameters = {
			search: lookup.search,
			country: lookup.country,
			max_results: lookup.maxResults,
			include_only_locality: lookup.includeOnlyLocality,
			include_only_postal_code: lookup.includeOnlyPostalCode,
		};

		if (lookup.address_id) {
			request.addressId = lookup.address_id;
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
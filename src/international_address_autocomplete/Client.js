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
			max_results: lookup.max_results,
			include_only_administrative_area: lookup.include_only_administrative_area,
			include_only_locality: lookup.include_only_locality,
			include_only_postal_code: lookup.include_only_postal_code,
		};

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
const Errors = require("../Errors");
const Request = require("../Request");
const Suggestion = require("./Suggestion");
const Promise = require("promise");

/**
 * This client sends lookups to the SmartyStreets US Autocomplete API, <br>
 *     and attaches the results to the appropriate Lookup objects.
 */
class Client {
	constructor(sender) {
		this.sender = sender;
	}

	send(lookup) {
		if (typeof lookup === "undefined") throw new Errors.UndefinedLookupError();

		let request = new Request();
		request.parameters = buildRequestParameters(lookup);

		return new Promise((resolve, reject) => {
			this.sender.send(request)
				.then(response => {
					if (response.error) reject(response.error);

					lookup.result = buildSuggestionsFromResponse(response.payload);
					resolve(lookup);
				})
				.catch(reject);
		});

		function buildRequestParameters(lookup) {
			return {
				prefix: lookup.prefix,
				suggestions: lookup.maxSuggestions,
				city_filter: joinFieldWith(lookup.cityFilter, ","),
				state_filter: joinFieldWith(lookup.stateFilter, ","),
				prefer: joinFieldWith(lookup.prefer, ";"),
				prefer_ratio: lookup.preferRatio,
				geolocate: lookup.geolocate,
				geolocate_precision: lookup.geolocatePrecision,
			};

			function joinFieldWith(field, delimiter) {
				if (field.length) return field.join(delimiter);
			}
		}

		function buildSuggestionsFromResponse(payload) {
			if (payload.suggestions === null) return [];

			return payload.suggestions.map(suggestion => new Suggestion(suggestion));
		}
	}
}

module.exports = Client;
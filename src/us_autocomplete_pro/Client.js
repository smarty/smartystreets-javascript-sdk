const Errors = require("../Errors");
const Request = require("../Request");
const Suggestion = require("./Suggestion");
const Promise = require("promise");

/**
 * This client sends lookups to the SmartyStreets US Autocomplete Pro API, <br>
 *     and attaches the suggestions to the appropriate Lookup objects.
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
				search: lookup.search,
				selected: lookup.selected,
				max_results: lookup.maxResults,
				include_only_cities: joinFieldWith(lookup.includeOnlyCities, ";"),
				include_only_states: joinFieldWith(lookup.includeOnlyStates, ";"),
				include_only_zip_codes: joinFieldWith(lookup.includeOnlyZIPCodes, ";"),
				exclude_states: joinFieldWith(lookup.excludeStates, ";"),
				prefer_cities: joinFieldWith(lookup.preferCities, ";"),
				prefer_states: joinFieldWith(lookup.preferStates, ";"),
				prefer_zip_codes: joinFieldWith(lookup.preferZIPCodes, ";"),
				prefer_ratio: lookup.preferRatio,
				prefer_geolocation: lookup.preferGeolocation,
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
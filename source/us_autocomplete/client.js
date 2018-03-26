const errors = require("../errors");
const Request = require("../request");
const Suggestion = require("./suggestion");
const Promise = require("promise");

class Client {
	constructor(sender) {
		this.sender = sender;
	}

	send(lookup) {
		if (typeof lookup === "undefined") {
			throw new errors.UndefinedLookupError();
		}

		let request = new Request();
		request.parameters = this.buildRequestParameters(lookup);

		return new Promise((resolve, reject) => {
			this.sender.send(request)
				.then(response => {
					if (response.error) reject(response.error);

					lookup.result = this.buildSuggestionsFromResponsePayload(response.payload);
					resolve(lookup);
				})
				.catch(reject);
		});
	}

	buildRequestParameters(lookup) {
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

	buildSuggestionsFromResponsePayload(payload) {
		return payload.map(suggestion => new Suggestion(suggestion));
	}
}

module.exports = Client;
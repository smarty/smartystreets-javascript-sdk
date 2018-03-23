class Client {
	constructor(sender) {
		this.sender = sender;
	}

	send(lookup) {
		this.sender.request.parameters = this.buildRequestParameters(lookup);
	}

	buildRequestParameters (lookup) {
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
}

module.exports = Client;
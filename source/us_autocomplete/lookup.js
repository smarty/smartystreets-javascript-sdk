class Lookup {
	constructor(prefix) {
		this.result = [];

		this.prefix = prefix;
		this.maxSuggestions = undefined;
		this.cityFilter = undefined;
		this.prefer = undefined;
		this.preferRatio = undefined;
		this.geolocate = undefined;
		this.geolocatePrecision = undefined;
	}
}

module.exports = Lookup;
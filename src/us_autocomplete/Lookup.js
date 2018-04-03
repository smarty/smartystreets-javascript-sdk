class Lookup {
	constructor(prefix) {
		this.result = [];

		this.prefix = prefix;
		this.maxSuggestions = undefined;
		this.cityFilter = [];
		this.stateFilter = [];
		this.prefer = [];
		this.preferRatio = undefined;
		this.geolocate = undefined;
		this.geolocatePrecision = undefined;
	}
}

module.exports = Lookup;
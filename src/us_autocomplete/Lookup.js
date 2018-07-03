/**
 * In addition to holding all of the input data for this lookup, this class also<br>
 *     will contain the result of the lookup after it comes back from the API.
 *     @see "https://smartystreets.com/docs/cloud/us-autocomplete-api#http-request-input-fields"
 */
class Lookup {
	/**
	 * @param prefix The beginning of an address. This is required to be set.
	 */
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
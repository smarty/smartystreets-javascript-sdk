/**
 * In addition to holding all of the input data for this lookup, this class also<br>
 *     will contain the result of the lookup after it comes back from the API.
 *     @see "https://smartystreets.com/docs/cloud/us-street-api#input-fields"
 */
class Lookup {
	constructor(latitude, longitude) {
		this.latitude = latitude.toFixed(8);
		this.longitude = longitude.toFixed(8);
		this.response = [];
	}
}

module.exports = Lookup;

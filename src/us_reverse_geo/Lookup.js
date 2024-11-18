const Response = require("./Response");

/**
 * In addition to holding all of the input data for this lookup, this class also<br>
 *     will contain the result of the lookup after it comes back from the API.
 *     @see "https://www.smarty.com/docs/cloud/us-street-api#input-fields"
 */
class Lookup {
	constructor(latitude, longitude, source="") {
		this.latitude = latitude.toFixed(8);
		this.longitude = longitude.toFixed(8);
		this.source = source;
		this.response = new Response();
		this.customParameters = {};
	}

	addCustomParameter(key, value) {
		this.customParameters[key] = value;
	}
}

module.exports = Lookup;

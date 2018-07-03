/**
 * In addition to holding all of the input data for this lookup, this class also<br>
 *     will contain the result of the lookup after it comes back from the API.
 *     @see "https://smartystreets.com/docs/cloud/us-zipcode-api#http-request-input-fields"
 */
class Lookup {
	constructor(city, state, zipCode, inputId) {
		this.city = city;
		this.state = state;
		this.zipCode = zipCode;
		this.inputId = inputId;
		this.result = [];
	}
}

module.exports = Lookup;
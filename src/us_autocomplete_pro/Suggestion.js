/**
 * @see "https://smartystreets.com/docs/cloud/us-autocomplete-api#pro-http-response"
 */
class Suggestion {
	constructor(responseData) {
		this.streetLine = responseData.street_line;
		this.secondary = responseData.secondary;
		this.city = responseData.city;
		this.state = responseData.state;
		this.zipcode = responseData.zipcode;
		this.entries = responseData.entries;
	}
}

module.exports = Suggestion;
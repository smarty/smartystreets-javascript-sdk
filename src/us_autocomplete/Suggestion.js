/**
 * @see "https://smartystreets.com/docs/cloud/us-autocomplete-api#http-response"
 */
class Suggestion {
	constructor(responseData) {
		this.text = responseData.text;
		this.streetLine = responseData.street_line;
		this.city = responseData.city;
		this.state = responseData.state;
	}
}

module.exports = Suggestion;
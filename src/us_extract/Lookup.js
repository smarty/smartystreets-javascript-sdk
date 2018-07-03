/**
 * In addition to holding all of the input data for this lookup, this class also<br>
 *     will contain the result of the lookup after it comes back from the API.
 *     @see "https://smartystreets.com/docs/cloud/us-extract-api#http-request-input-fields"
 */
class Lookup {
	/**
	 * @param text The text that is to have addresses extracted out of it for verification (required)
	 */
	constructor(text) {
		this.result = {
			meta: {},
			addresses: [],
		};
		//TODO: require the text field.
		this.text = text;
		this.html = undefined;
		this.aggressive = undefined;
		this.addressesHaveLineBreaks = undefined;
		this.addressesPerLine = undefined;
	}
}

module.exports = Lookup;
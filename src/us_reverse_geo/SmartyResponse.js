/**
 * The SmartyResponse contains the response from a call to the US Reverse Geo API.
 */
class SmartyResponse {
	constructor(responseData) {
		this.results = responseData.results;
	}
}

module.exports = SmartyResponse;
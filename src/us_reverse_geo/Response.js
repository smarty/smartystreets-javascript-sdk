const Result = require("./Result");

/**
 * The SmartyResponse contains the response from a call to the US Reverse Geo API.
 */
class Response {
	constructor(responseData) {
		this.results = [];

		if (responseData)
			responseData.results.map(rawResult => {
				this.results.push(new Result(rawResult));
			});
	}
}

module.exports = Response;

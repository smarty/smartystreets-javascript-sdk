const Candidate = require("../us_street/Candidate");

/**
 * @see <a href="https://www.smarty.com/docs/cloud/us-extract-api#http-response-status">Smarty US Extract API docs</a>
 */
class Address {
	constructor (responseData) {
		this.text = responseData.text;
		this.verified = responseData.verified;
		this.line = responseData.line;
		this.start = responseData.start;
		this.end = responseData.end;
		this.candidates = responseData.api_output.map(rawAddress => new Candidate(rawAddress));
	}
}

module.exports = Address;
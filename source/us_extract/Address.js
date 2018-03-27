const Candidate = require("../us_street/Candidate");

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
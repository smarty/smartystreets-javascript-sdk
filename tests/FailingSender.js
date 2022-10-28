const {buildSmartyResponse} = require("../src/util/buildSmartySender.js");

class FailingSender {
	constructor(statusCodes, headers= undefined, error = undefined) {
		this.statusCodes = statusCodes;
		this.headers = headers;
		this.error = error;
		this.currentStatusCodeIndex = 0;
	}

	send(request) {
		let mockResponse = {
			status: this.statusCodes[this.currentStatusCodeIndex],
			headers: this.headers,
			error: this.error,
		};
		const response = buildSmartyResponse(mockResponse);
		this.currentStatusCodeIndex += 1;
		return response;
	}
}

module.exports = FailingSender;
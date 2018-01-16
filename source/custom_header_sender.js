const Promise = require("promise");

class CustomHeaderSender {
	constructor(innerSender, customHeaders) {
		this.innerSender = innerSender;
		this.customHeaders = customHeaders;
	}

	send(request) {
		for (let key in this.customHeaders) {
			request.headers[key] = this.customHeaders[key];
		}

		return new Promise((resolve, reject) => {
			this.innerSender.send(request).then(response => resolve(response), error => reject(error));
		});
	}
}

module.exports = CustomHeaderSender;
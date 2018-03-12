const Promise = require("promise");

class CustomHeaderSender {
	constructor(innerSender, customHeaders) {
		this.sender = innerSender;
		this.customHeaders = customHeaders;
	}

	send(request) {
		for (let key in this.customHeaders) {
			request.headers[key] = this.customHeaders[key];
		}

		return new Promise((resolve, reject) => {
			this.sender.send(request)
				.then(resolve)
				.catch(reject);
		});
	}
}

module.exports = CustomHeaderSender;
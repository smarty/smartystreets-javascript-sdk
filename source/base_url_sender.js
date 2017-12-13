const Promise = require("promise");

class BaseUrlSender {
	constructor(urlOverride, innerSender) {
		this.urlOverride = urlOverride;
		this.innerSender = innerSender;
	}

	send(request) {
		return new Promise((resolve, reject) => {
			request.baseUrl = this.urlOverride;
			this.innerSender.send(request).then(response => {
				resolve(response);
			}, error => {
				reject(error);
			});
		});
	}
}

module.exports = BaseUrlSender;
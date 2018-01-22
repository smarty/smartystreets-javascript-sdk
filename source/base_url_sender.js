const Promise = require("promise");

class BaseUrlSender {
	constructor(innerSender, urlOverride) {
		this.urlOverride = urlOverride;
		this.sender = innerSender;
	}

	send(request) {
		return new Promise((resolve, reject) => {
			request.baseUrl = this.urlOverride;
			this.sender.send(request).then(response => {
				resolve(response);
			}, error => {
				reject(error);
			});
		});
	}
}

module.exports = BaseUrlSender;
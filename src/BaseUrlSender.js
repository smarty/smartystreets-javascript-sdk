const Promise = require("promise");

class BaseUrlSender {
	constructor(innerSender, urlOverride) {
		this.urlOverride = urlOverride;
		this.sender = innerSender;
	}

	send(request) {
		return new Promise((resolve, reject) => {
			request.baseUrl = this.urlOverride;

			this.sender.send(request)
				.then(resolve)
				.catch(reject);
		});
	}
}

module.exports = BaseUrlSender;
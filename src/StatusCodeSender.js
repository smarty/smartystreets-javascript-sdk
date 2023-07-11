const Errors = require("./Errors");

class StatusCodeSender {
	constructor(innerSender) {
		this.sender = innerSender;
	}

	send(request) {
		return new Promise((resolve, reject) => {
			this.sender.send(request)
				.then(resolve)
				.catch(error => {
					switch (error.statusCode) {
						case 500:
							error.error = new Errors.InternalServerError();
							break;

						case 503:
							error.error = new Errors.ServiceUnavailableError();
							break;

						case 504:
							error.error = new Errors.GatewayTimeoutError();
							break;

						default:
							error.error = new Errors.DefaultError(error.payload?.errors?.[0]?.message)
					}
					reject(error);
				});
		});
	}
}

module.exports = StatusCodeSender;
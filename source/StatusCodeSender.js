const Promise = require("promise");
const errors = require("./errors");

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
						case 400:
							error.error = new errors.BadRequestError();
							break;

						case 401:
							error.error = new errors.BadCredentialsError();
							break;

						case 402:
							error.error = new errors.PaymentRequiredError();
							break;

						case 413:
							error.error = new errors.RequestEntityTooLargeError();
							break;

						case 422:
							error.error = new errors.UnprocessableEntityError("GET request lacked required fields.");
							break;

						case 429:
							error.error = new errors.TooManyRequestsError();
							break;

						case 500:
							error.error = new errors.InternalServerError();
							break;

						case 503:
							error.error = new errors.ServiceUnavailableError();
							break;

						case 504:
							error.error = new errors.GatewayTimeoutError();
							break;
					}

					reject(error);
				});
		});
	}
}

module.exports = StatusCodeSender;
const Promise = require("promise");
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
						case 400:
							error.error = new Errors.BadRequestError();
							break;

						case 401:
							error.error = new Errors.BadCredentialsError();
							break;

						case 402:
							error.error = new Errors.PaymentRequiredError();
							break;

						case 413:
							error.error = new Errors.RequestEntityTooLargeError();
							break;

						case 422:
							error.error = new Errors.UnprocessableEntityError("GET request lacked required fields.");
							break;

						case 429:
							error.error = new Errors.TooManyRequestsError();
							break;

						case 500:
							error.error = new Errors.InternalServerError();
							break;

						case 503:
							error.error = new Errors.ServiceUnavailableError();
							break;

						case 504:
							error.error = new Errors.GatewayTimeoutError();
							break;
					}

					reject(error);
				});
		});
	}
}

module.exports = StatusCodeSender;
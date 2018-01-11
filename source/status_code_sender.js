const Promise = require("promise");
const errors = require("./errors");

class StatusCodeSender {
	constructor (innerSender) {
		this.innerSender = innerSender;
	}

	send(request) {
		return new Promise((resolve, reject) => {
			this.innerSender.send(request).then(response => {
				resolve(response);
			}, error => {
				switch (error.statusCode) {
					case 400:
						error.error = errors.BadRequestError;
						break;

					case 401:
						error.error = errors.BadCredentialsError;
						break;

					case 402:
						error.error = errors.PaymentRequiredError;
						break;

					case 413:
						error.error = errors.RequestEntityTooLargeError;
						break;

					case 422:
						error.error = errors.UnprocessableEntityError;
						break;

					case 429:
						error.error = errors.TooManyRequestsError;
						break;

					case 500:
						error.error = errors.InternalServerError;
						break;
				}
				reject(error);
			});
		});
	}
}

module.exports = StatusCodeSender;
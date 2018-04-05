const chai = require("chai");
const expect = chai.expect;
const StatusCodeSender = require("../src/StatusCodeSender");
const Response = require("../src/Response");
const Request = require("../src/Request");
const errors = require("../src/Errors");

describe("A status code sender", function () {
	it("doesn't attach an error on a 200.", function () {
		let mockSender = {
			send: () => {
				return new Promise((resolve, reject) => {
					resolve(new Response(200));
				});
			}
		};

		let statusCodeSender = new StatusCodeSender(mockSender);
		let request = new Request();

		return statusCodeSender.send(request).then(response => {
			expect(response.error === undefined).to.equal(true);
		});
	});

	it("gives a Bad Credentials error on a 401.", function () {
		return expectedErrorForStatusCode(errors.BadCredentialsError, 401);
	});

	it("gives a Payment Required error on a 402.", function () {
		return expectedErrorForStatusCode(errors.PaymentRequiredError, 402);
	});

	it("gives a Request Entity Too Large error on a 413.", function () {
		return expectedErrorForStatusCode(errors.RequestEntityTooLargeError, 413);
	});

	it("gives a Bad Request error on a 400.", function () {
		return expectedErrorForStatusCode(errors.BadRequestError, 400);
	});

	it("gives an Unprocessable Entity error on a 422.", function () {
		return expectedErrorForStatusCode(errors.UnprocessableEntityError, 422);
	});

	it("gives a Too Many Requests error on a 429.", function () {
		return expectedErrorForStatusCode(errors.TooManyRequestsError, 429);
	});

	it("gives an Internal Server Error error on a 500.", function () {
		return expectedErrorForStatusCode(errors.InternalServerError, 500);
	});

	it("gives an Service Unvailable error on a 503.", function () {
		return expectedErrorForStatusCode(errors.ServiceUnavailableError, 503);
	});

	it("gives an Gateway Timeout error on a 504.", function () {
		return expectedErrorForStatusCode(errors.GatewayTimeoutError, 504);
	});
});

function expectedErrorForStatusCode(expectedError, errorCode) {
	let mockSender = generateMockSender(errorCode);
	let statusCodeSender = new StatusCodeSender(mockSender);
	let request = new Request();

	return statusCodeSender.send(request).then(response => {
	}, error => {
		expect(error.error).to.be.an.instanceOf(expectedError);
	})
}

function generateMockSender(errorCode) {
	return {
		send: () => {
			return new Promise((resolve, reject) => {
				reject(new Response(errorCode))
			});
		}
	};
}

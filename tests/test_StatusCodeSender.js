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

	it("gives the message from the body as ", function () {
		const payload = {
			errors: [
				{message: "custom message"}
			]
		}
		return expectedDefaultError(400, payload)
	})

	it("gives an Internal Server Error on a 500.", function () {
		return expectedErrorForStatusCode(errors.InternalServerError, 500);
	});

	it("gives an Service Unavailable error on a 503.", function () {
		return expectedErrorForStatusCode(errors.ServiceUnavailableError, 503);
	});

	it("gives an Gateway Timeout error on a 504.", function () {
		return expectedErrorForStatusCode(errors.GatewayTimeoutError, 504);
	});
});

const expectedDefaultError = (errorCode, payload) => {
	let mockSender = generateMockSender(errorCode, payload);
	let statusCodeSender = new StatusCodeSender(mockSender);
	let request = new Request();

	return statusCodeSender.send(request).then(() => {
	}, error => {
		console.log(error.error)
		expect(error.error).to.be.an.instanceOf(errors.DefaultError);
		expect(error.error.message).to.be.equal(payload.errors[0].message);
	})
}

function expectedErrorForStatusCode(expectedError, errorCode, payload) {
	let mockSender = generateMockSender(errorCode, payload);
	let statusCodeSender = new StatusCodeSender(mockSender);
	let request = new Request();

	return statusCodeSender.send(request).then(() => {
	}, error => {
		expect(error.error).to.be.an.instanceOf(expectedError);
	})
}

function generateMockSender(errorCode, payload) {
	return {
		send: () => {
			return new Promise((resolve, reject) => {
				reject(new Response(errorCode, payload))
			});
		}
	};
}

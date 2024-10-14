import { Response } from "../src/Response.js";
import {StatusCodeSender} from "../src/StatusCodeSender.js";
import {DefaultError, GatewayTimeoutError, InternalServerError, ServiceUnavailableError} from "../src/Errors.js";
import { Request} from "../src/Request.js";
import { expect } from "chai";


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

	it("gives a custom message for 400", function () {
		const payload = {
			errors: [
				{message: "custom message"}
			]
		};
		return expectedErrorWithPayloadMessage(400, payload);
	})

	it("returns an error message if payload is undefined", function () {
		return expectedDefaultError()
	})

	it("gives an Internal Server Error on a 500.", function () {
		return expectedErrorForStatusCode(InternalServerError, 500);
	});

	it("gives an Service Unavailable error on a 503.", function () {
		return expectedErrorForStatusCode(ServiceUnavailableError, 503);
	});

	it("gives an Gateway Timeout error on a 504.", function () {
		return expectedErrorForStatusCode(GatewayTimeoutError, 504);
	});
});

const expectedErrorWithPayloadMessage = (errorCode, payload) => {
	let mockSender = generateMockSender(errorCode, payload);
	let statusCodeSender = new StatusCodeSender(mockSender);
	let request = new Request();

	return statusCodeSender.send(request).then(() => {
	}, error => {
		expect(error.error).to.be.an.instanceOf(DefaultError);
		expect(error.error.message).to.be.equal(payload.errors[0].message);
	})
}

const expectedDefaultError = () => {
	let mockSender = generateMockSender(400);
	let statusCodeSender = new StatusCodeSender(mockSender);
	let request = new Request();

	return statusCodeSender.send(request).then(() => {
	}, error => {
		expect(error.error).to.be.an.instanceOf(DefaultError);
		expect(error.error.message).to.be.equal("unexpected error");
	})
}

function expectedErrorForStatusCode(expectedError, errorCode) {
	let mockSender = generateMockSender(errorCode);
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

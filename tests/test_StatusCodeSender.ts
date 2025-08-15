import { expect } from "chai";

import StatusCodeSender from "../src/StatusCodeSender";
import Response from "../src/Response";
import Request from "../src/Request";
import {
	DefaultError,
	InternalServerError,
	ServiceUnavailableError,
	GatewayTimeoutError,
} from "../src/Errors";
import { Sender } from "../src/types";

describe("A status code sender", function () {
	it("doesn't attach an error on a 200.", function () {
		let mockSender: Sender = {
			send: () => {
				return new Promise((resolve, reject) => {
					resolve(new Response(200, null, null, {}));
				});
			},
		};

		let statusCodeSender = new StatusCodeSender(mockSender);
		let request = new Request();

		return statusCodeSender.send(request).then((response) => {
			expect(response.error === null).to.equal(true);
		});
	});

	it("gives a custom message for 400", function () {
		const payload = {
			errors: [{ message: "custom message" }],
		};
		return expectedErrorWithPayloadMessage(400, payload);
	});

	it("returns an error message if payload is undefined", function () {
		return expectedDefaultError();
	});

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

const expectedErrorWithPayloadMessage = (errorCode: number, payload: any) => {
	let mockSender = generateMockSender(errorCode, payload);
	let statusCodeSender = new StatusCodeSender(mockSender);
	let request = new Request();

	return statusCodeSender.send(request).then(
		() => {},
		(error) => {
			expect(error.error).to.be.an.instanceOf(DefaultError);
			expect(error.error.message).to.be.equal(payload.errors[0].message);
		},
	);
};

const expectedDefaultError = () => {
	let mockSender = generateMockSender(400);
	let statusCodeSender = new StatusCodeSender(mockSender);
	let request = new Request();

	return statusCodeSender.send(request).then(
		() => {},
		(error) => {
			expect(error.error).to.be.an.instanceOf(DefaultError);
			expect(error.error.message).to.be.equal("Unknown error");
		},
	);
};

function expectedErrorForStatusCode(expectedError: any, errorCode: number) {
	let mockSender = generateMockSender(errorCode);
	let statusCodeSender = new StatusCodeSender(mockSender);
	let request = new Request();

	return statusCodeSender.send(request).then(
		() => {},
		(error) => {
			expect(error.error).to.be.an.instanceOf(expectedError);
		},
	);
}

function generateMockSender(errorCode: number, payload?: any): Sender {
	return {
		send: () => {
			return new Promise((resolve, reject) => {
				reject(new Response(errorCode, payload, null, {}));
			});
		},
	};
}

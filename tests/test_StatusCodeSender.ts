import { expect } from "chai";
import StatusCodeSender from "../src/StatusCodeSender.js";
import Response from "../src/Response.js";
import Request from "../src/Request.js";
import errors from "../src/Errors.js";

describe("A status code sender", function () {
	it("doesn't attach an error on a 200.", function () {
		let mockSender = {
			send: () => {
				return new Promise((resolve, _reject) => {
					resolve(new Response(200));
				});
			},
		};

		let statusCodeSender = new StatusCodeSender(mockSender as any);
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
		return expectedErrorForStatusCode(errors.InternalServerError, 500);
	});

	it("gives an Service Unavailable error on a 503.", function () {
		return expectedErrorForStatusCode(errors.ServiceUnavailableError, 503);
	});

	it("gives an Gateway Timeout error on a 504.", function () {
		return expectedErrorForStatusCode(errors.GatewayTimeoutError, 504);
	});

	it("rejects with NotModifiedError on a 304 and captures lowercase etag header", function () {
		const response = new Response(304, null, null, { etag: "abc-123" });
		const mockSender = { send: () => Promise.resolve(response) };
		const statusCodeSender = new StatusCodeSender(mockSender as any);

		return statusCodeSender.send(new Request()).then(
			() => {
				throw new Error("expected rejection");
			},
			(rejected) => {
				expect(rejected.statusCode).to.equal(304);
				expect(rejected.error).to.be.an.instanceOf(errors.NotModifiedError);
				expect(rejected.error.responseEtag).to.equal("abc-123");
			},
		);
	});

	it("rejects with NotModifiedError on a 304 and captures mixed-case ETag header", function () {
		const response = new Response(304, null, null, { ETag: "srv-2" });
		const mockSender = { send: () => Promise.resolve(response) };
		const statusCodeSender = new StatusCodeSender(mockSender as any);

		return statusCodeSender.send(new Request()).then(
			() => {
				throw new Error("expected rejection");
			},
			(rejected) => {
				expect(rejected.error).to.be.an.instanceOf(errors.NotModifiedError);
				expect(rejected.error.responseEtag).to.equal("srv-2");
			},
		);
	});

	it("rejects with NotModifiedError with undefined responseEtag when the Etag header is absent", function () {
		const response = new Response(304, null, null, {});
		const mockSender = { send: () => Promise.resolve(response) };
		const statusCodeSender = new StatusCodeSender(mockSender as any);

		return statusCodeSender.send(new Request()).then(
			() => {
				throw new Error("expected rejection");
			},
			(rejected) => {
				expect(rejected.error).to.be.an.instanceOf(errors.NotModifiedError);
				expect(rejected.error.responseEtag).to.equal(undefined);
			},
		);
	});

	it("handles a 304 that was thrown (rather than resolved) by the inner sender", function () {
		const response = new Response(304, null, null, { Etag: "thrown" });
		const mockSender = { send: () => Promise.reject(response) };
		const statusCodeSender = new StatusCodeSender(mockSender as any);

		return statusCodeSender.send(new Request()).then(
			() => {
				throw new Error("expected rejection");
			},
			(rejected) => {
				expect(rejected.statusCode).to.equal(304);
				expect(rejected.error).to.be.an.instanceOf(errors.NotModifiedError);
				expect(rejected.error.responseEtag).to.equal("thrown");
			},
		);
	});
});

const expectedErrorWithPayloadMessage = (errorCode: any, payload: any) => {
	let mockSender = generateMockSender(errorCode, payload);
	let statusCodeSender = new StatusCodeSender(mockSender as any);
	let request = new Request();

	return statusCodeSender.send(request).then(
		() => {},
		(error) => {
			expect(error.error).to.be.an.instanceOf(errors.DefaultError);
			expect(error.error.message).to.be.equal(payload.errors[0].message);
		},
	);
};

const expectedDefaultError = () => {
	let mockSender = generateMockSender(400);
	let statusCodeSender = new StatusCodeSender(mockSender as any);
	let request = new Request();

	return statusCodeSender.send(request).then(
		() => {},
		(error) => {
			expect(error.error).to.be.an.instanceOf(errors.DefaultError);
			expect(error.error.message).to.be.equal("unexpected error");
		},
	);
};

function expectedErrorForStatusCode(expectedError: any, errorCode: any) {
	let mockSender = generateMockSender(errorCode);
	let statusCodeSender = new StatusCodeSender(mockSender as any);
	let request = new Request();

	return statusCodeSender.send(request).then(
		() => {},
		(error) => {
			expect(error.error).to.be.an.instanceOf(expectedError);
		},
	);
}

function generateMockSender(errorCode: any, payload?: any) {
	return {
		send: () => {
			return new Promise((_resolve, reject) => {
				reject(new Response(errorCode, payload));
			});
		},
	};
}

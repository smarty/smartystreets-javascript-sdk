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
		return expectedErrorWithPayloadMessage(400, payload, errors.BadRequestError, "custom message");
	});

	it("falls back to the standard message if payload is undefined", function () {
		return expectedErrorWithFallbackMessage(
			400,
			errors.BadRequestError,
			"Bad Request (Malformed Payload): A GET request lacked a required field or the request body of a POST request contained malformed JSON.",
		);
	});

	it("gives a Bad Credentials error on a 401.", function () {
		return expectedErrorWithFallbackMessage(
			401,
			errors.BadCredentialsError,
			"Unauthorized: The credentials were provided incorrectly or did not match any existing, active credentials.",
		);
	});

	it("gives a Payment Required error on a 402.", function () {
		return expectedErrorWithFallbackMessage(
			402,
			errors.PaymentRequiredError,
			"Payment Required: There is no active subscription for the account associated with the credentials submitted with the request.",
		);
	});

	it("gives a Forbidden error on a 403.", function () {
		return expectedErrorWithFallbackMessage(
			403,
			errors.ForbiddenError,
			"Forbidden: The request contained valid data and was understood by the server, but the server is refusing action.",
		);
	});

	it("gives a Request Timeout error on a 408.", function () {
		return expectedErrorWithFallbackMessage(
			408,
			errors.RequestTimeoutError,
			"Request timeout error.",
		);
	});

	it("gives a Request Entity Too Large error on a 413.", function () {
		return expectedErrorWithFallbackMessage(
			413,
			errors.RequestEntityTooLargeError,
			"Request Entity Too Large: The request body has exceeded the maximum size.",
		);
	});

	it("gives an Unprocessable Entity error on a 422.", function () {
		return expectedErrorWithFallbackMessage(
			422,
			errors.UnprocessableEntityError,
			"GET request lacked required fields.",
		);
	});

	it("gives a Too Many Requests error on a 429.", function () {
		return expectedErrorWithFallbackMessage(
			429,
			errors.TooManyRequestsError,
			"Too Many Requests: The rate limit for your account has been exceeded.",
		);
	});

	it("gives an Internal Server Error on a 500.", function () {
		return expectedErrorWithFallbackMessage(
			500,
			errors.InternalServerError,
			"Internal Server Error.",
		);
	});

	it("gives a Bad Gateway error on a 502.", function () {
		return expectedErrorWithFallbackMessage(502, errors.BadGatewayError, "Bad Gateway error.");
	});

	it("gives an Service Unavailable error on a 503.", function () {
		return expectedErrorWithFallbackMessage(
			503,
			errors.ServiceUnavailableError,
			"Service Unavailable. Try again later.",
		);
	});

	it("gives an Gateway Timeout error on a 504.", function () {
		return expectedErrorWithFallbackMessage(
			504,
			errors.GatewayTimeoutError,
			"The upstream data provider did not respond in a timely fashion and the request failed. A serious, yet rare occurrence indeed.",
		);
	});

	it("uses the API message for a 500 when present.", function () {
		const payload = { errors: [{ message: "API broke" }] };
		return expectedErrorWithPayloadMessage(500, payload, errors.InternalServerError, "API broke");
	});

	it("joins multiple API messages.", function () {
		const payload = { errors: [{ message: "First problem." }, { message: "Second problem." }] };
		return expectedErrorWithPayloadMessage(
			422,
			payload,
			errors.UnprocessableEntityError,
			"First problem. Second problem.",
		);
	});

	it("parses the API message from a JSON string payload.", function () {
		return expectedErrorWithPayloadMessage(
			401,
			JSON.stringify({ errors: [{ message: "bad credentials from api" }] }),
			errors.BadCredentialsError,
			"bad credentials from api",
		);
	});

	it("gives a Default error with the standard message for an unexpected status code.", function () {
		return expectedErrorWithFallbackMessage(
			418,
			errors.DefaultError,
			"The server returned an unexpected HTTP status code: 418",
		);
	});

	it("uses the API message for an unexpected status code when present.", function () {
		const payload = { errors: [{ message: "API teapot message" }] };
		return expectedErrorWithPayloadMessage(418, payload, errors.DefaultError, "API teapot message");
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

const expectedErrorWithPayloadMessage = (
	errorCode: any,
	payload: any,
	expectedError: any,
	expectedMessage: string,
) => {
	let mockSender = generateMockSender(errorCode, payload);
	let statusCodeSender = new StatusCodeSender(mockSender as any);
	let request = new Request();

	return statusCodeSender.send(request).then(
		() => {
			throw new Error("expected rejection");
		},
		(error) => {
			expect(error.error).to.be.an.instanceOf(expectedError);
			expect(error.error.message).to.be.equal(expectedMessage);
		},
	);
};

function expectedErrorWithFallbackMessage(
	errorCode: any,
	expectedError: any,
	expectedMessage: string,
) {
	let mockSender = generateMockSender(errorCode);
	let statusCodeSender = new StatusCodeSender(mockSender as any);
	let request = new Request();

	return statusCodeSender.send(request).then(
		() => {
			throw new Error("expected rejection");
		},
		(error) => {
			expect(error.error).to.be.an.instanceOf(expectedError);
			expect(error.error.message).to.be.equal(expectedMessage);
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

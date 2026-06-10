import { expect } from "chai";
import errors from "../src/Errors.js";

describe("Smarty error classes", function () {
	const expectedNames: Record<string, string> = {
		SmartyError: "SmartyError",
		DefaultError: "DefaultError",
		BatchFullError: "BatchFullError",
		BatchEmptyError: "BatchEmptyError",
		UndefinedLookupError: "UndefinedLookupError",
		BadCredentialsError: "BadCredentialsError",
		PaymentRequiredError: "PaymentRequiredError",
		ForbiddenError: "ForbiddenError",
		RequestTimeoutError: "RequestTimeoutError",
		RequestEntityTooLargeError: "RequestEntityTooLargeError",
		BadRequestError: "BadRequestError",
		UnprocessableEntityError: "UnprocessableEntityError",
		TooManyRequestsError: "TooManyRequestsError",
		InternalServerError: "InternalServerError",
		BadGatewayError: "BadGatewayError",
		ServiceUnavailableError: "ServiceUnavailableError",
		GatewayTimeoutError: "GatewayTimeoutError",
		NotModifiedError: "NotModifiedError",
	};

	it("sets an explicit name on every error class so it survives minification.", function () {
		for (const [exportName, expectedName] of Object.entries(expectedNames)) {
			const ErrorClass = (errors as any)[exportName];
			const instance = new ErrorClass();
			expect(instance.name, exportName).to.equal(expectedName);
		}
	});

	it("keeps the name when a custom message is supplied.", function () {
		const error = new errors.BadCredentialsError("message from the API");
		expect(error.name).to.equal("BadCredentialsError");
		expect(error.message).to.equal("message from the API");
	});

	it("extends SmartyError and Error for every class.", function () {
		for (const exportName of Object.keys(expectedNames)) {
			const ErrorClass = (errors as any)[exportName];
			const instance = new ErrorClass();
			expect(instance, exportName).to.be.an.instanceOf(errors.SmartyError);
			expect(instance, exportName).to.be.an.instanceOf(Error);
		}
	});
});

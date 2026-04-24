import { expect } from "chai";
import { NotModifiedError, SmartyError } from "../src/Errors.js";

describe("NotModifiedError", function () {
	it("carries message and responseEtag when both are provided", function () {
		const err = new NotModifiedError("custom", "abc-123");
		expect(err.message).to.equal("custom");
		expect(err.responseEtag).to.equal("abc-123");
	});

	it("uses a default message and undefined responseEtag when message only is provided", function () {
		const err = new NotModifiedError("custom");
		expect(err.message).to.equal("custom");
		expect(err.responseEtag).to.equal(undefined);
	});

	it("uses a default message and undefined responseEtag when no args are provided", function () {
		const err = new NotModifiedError();
		expect(err.message).to.match(/Not Modified/);
		expect(err.responseEtag).to.equal(undefined);
	});

	it("is an instance of SmartyError and Error", function () {
		const err = new NotModifiedError();
		expect(err).to.be.an.instanceOf(SmartyError);
		expect(err).to.be.an.instanceOf(Error);
	});
});

const chai = require("chai");
const expect = chai.expect;
const BaseUrlSender = require("../dist/cjs/BaseUrlSender.cjs").default;
const Request = require("../src/Request");

describe("A base url sender", function () {
	let innerSender;
	let request;
	let urlOverride;
	let baseUrlSender;

	beforeEach(() => {
		innerSender = {
			send: () => true,
		};
		request = new Request();
		urlOverride = "I'm in your base, killing your mans.";
		baseUrlSender = new BaseUrlSender(innerSender, urlOverride);
	});

	it("replaces the request's base url with a new value.", function () {
		request.baseUrl = "All your baseUrl are belong to us.";
		baseUrlSender.send(request);

		expect(request.baseUrl).to.equal(urlOverride);
	});

	it("returns a promise.", function () {
		expect(baseUrlSender.send(request) instanceof Promise).to.equal(true);
	});
});
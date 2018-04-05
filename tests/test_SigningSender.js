const chai = require("chai");
const expect = chai.expect;
const Request = require("../src/Request");
const SigningSender = require("../src/SigningSender");
const StaticCredentials = require("../src/StaticCredentials");
const SharedCredentials = require("../src/SharedCredentials");
const Errors = require("../src/Errors");

describe("A signing sender", function () {
	let mockAuthId = "testId";
	let mockAuthToken = "testToken";
	let mockHostName = "testHostName";
	let mockSender = {
		send: request => new Promise()
	};
	let request;

	beforeEach(function () {
		request = new Request();
	});

	it("signs a request with static credentials.", function () {
		let staticCredentials = new StaticCredentials(mockAuthId, mockAuthToken);
		let signingSender = new SigningSender(mockSender, staticCredentials);

		signingSender.send(request);

		expect(request.parameters.hasOwnProperty("auth-id")).to.equal(true);
		expect(request.parameters["auth-id"]).to.equal(mockAuthId);
		expect(request.parameters.hasOwnProperty("auth-token")).to.equal(true);
		expect(request.parameters["auth-token"]).to.equal(mockAuthToken);
	});

	it("signs a request with shared credentials.", function () {
		let sharedCredentials = new SharedCredentials(mockAuthId, mockHostName);
		let signingSender = new SigningSender(mockSender, sharedCredentials);

		signingSender.send(request);

		expect(request.parameters.hasOwnProperty("auth-id")).to.equal(true);
		expect(request.parameters["auth-id"]).to.equal(mockAuthId);
		expect(request.headers.hasOwnProperty("Referer")).to.equal(true);
		expect(request.headers["Referer"]).to.equal(mockHostName);
	});

	it("errors if signing a POST request with shared credentials.", function () {
		let sharedCredentials = new SharedCredentials(mockAuthId, mockHostName);
		let signingSender = new SigningSender(mockSender, sharedCredentials);
		let mockRequestPayload = {
			foo: "bar",
		};
		request.payload = mockRequestPayload;

		expect(() => signingSender.send(request)).to.throw(Errors.UnprocessableEntityError);
	});
});
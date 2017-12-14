const chai = require("chai");
const expect = chai.expect;
const Request = require("../source/request");
const SigningSender = require("../source/signing_sender");
const StaticCredentials = require("../source/static_credentials");

describe ("A signing sender", function () {
	it ("signs a request with static credentials.", function () {
		let mockAuthId = "testId";
		let mockAuthToken = "testToken";
		let staticCredentials = new StaticCredentials(mockAuthId, mockAuthToken);
		let mockSender = {
			send: (request) => {
				return new Promise((resolve, reject) => {
					resolve(true);
				});
			}
		};
		let request = new Request();
		let signingSender = new SigningSender(staticCredentials, mockSender);

		signingSender.send(request);

		expect(request.parameters.hasOwnProperty("auth-id")).to.equal(true);
		expect(request.parameters["auth-id"]).to.equal(mockAuthId);
		expect(request.parameters.hasOwnProperty("auth-token")).to.equal(true);
		expect(request.parameters["auth-token"]).to.equal(mockAuthToken);
	});
});
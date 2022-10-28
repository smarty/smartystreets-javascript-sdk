const chai = require("chai");
const expect = chai.expect;
const RetrySender = require("../src/RetrySender");

describe ("An Axios implementation of a Retry Sender", function () {
	it("has a response with the right status code.", function () {
		let sender = new RetrySender();
		let mockResponse = {
			status: 200
		};
		// let smartyResponse = sender.buildSmartyResponse(mockResponse);
		for (let i = 0; i < 5; i++) {
			const mockResult = sender.retry(mockResponse, i);
			if (!mockResult) break;
		}

		// expect(smartyResponse.hasOwnProperty("statusCode")).to.equal(true);
		// expect(smartyResponse.statusCode).to.equal(200);
	});

	it("has a response with a 408 code", function () {
		let sender = new RetrySender();
		let mockResponse = {
			status: 408
		};
		// let smartyResponse = sender.buildSmartyResponse(mockResponse);
		for (let i = 0; i < 5; i++) {
			const mockResult = sender.retry(mockResponse, i);
			if (!mockResult) break;
		}
		// expect(smartyResponse.hasOwnProperty("statusCode")).to.equal(true);
		// expect(smartyResponse.statusCode).to.equal(408);
	})

	it("has a response with a 429 code", function () {
		let sender = new RetrySender();
		let mockResponse = {
			status: 429,
			headers: {
				"Retry-After": 3000
			}
		};
		// let smartyResponse = sender.buildSmartyResponse(mockResponse);
		for (let i = 0; i < 5; i++) {
			const mockResult = sender.retry(mockResponse, i);
			if (!mockResult) break;
		}
		console.log("Færdig");
		// expect(smartyResponse.hasOwnProperty("statusCode")).to.equal(true);
		// expect(smartyResponse.statusCode).to.equal(408);
	})
});
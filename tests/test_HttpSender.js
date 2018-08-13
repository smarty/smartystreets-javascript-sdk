const chai = require("chai");
const expect = chai.expect;
const Request = require("../src/Request");
const HttpSender = require("../src/HttpSender");

describe ("An Axios implementation of a HTTP sender", function () {
	it("adds a data payload to the HTTP request config.", function () {
		let expectedPayload = "test payload";
		let request = new Request(expectedPayload);
		let sender = new HttpSender();
		let requestConfig = sender.buildRequestConfig(request);

		expect(requestConfig.hasOwnProperty("data")).to.equal(true);
		expect(requestConfig.data).to.equal(expectedPayload);
	});

	it ("adds a POST method to the HTTP request config when appropriate.", function () {
		let request = new Request("test payload");
		let sender = new HttpSender();
		let requestConfig = sender.buildRequestConfig(request);

		expect(requestConfig.hasOwnProperty("method")).to.equal(true);
		expect(requestConfig.method).to.equal("POST");
	});

	it ("adds a GET method to the HTTP request config when appropriate.", function () {
		let request = new Request();
		let sender = new HttpSender();
		let requestConfig = sender.buildRequestConfig(request);

		expect(requestConfig.hasOwnProperty("method")).to.equal(true);
		expect(requestConfig.method).to.equal("GET");
	});

	it ("add a timeout to the HTTP request config.", function () {
		let request = new Request("test payload");
		let sender = new HttpSender();
		let requestConfig = sender.buildRequestConfig(request);

		let customTimeoutSender = new HttpSender(5);
		let customTimeoutRequestConfig = customTimeoutSender.buildRequestConfig(request);

		expect(requestConfig.hasOwnProperty("timeout")).to.equal(true);
		expect(requestConfig.timeout).to.equal(10000);

		expect(customTimeoutRequestConfig.timeout).to.equal(5);
	});

	it ("adds parameters to the HTTP request config.", function () {
		let request = new Request("");
		let sender = new HttpSender();
		request.parameters.test = "1";
		let requestConfig = sender.buildRequestConfig(request);

		expect(requestConfig.hasOwnProperty("params")).to.equal(true);
		expect(requestConfig.params).to.deep.equal(request.parameters);
	});

	it ("adds headers to the HTTP request config.", function () {
		let request = new Request("");
		let sender = new HttpSender();
		let requestConfig = sender.buildRequestConfig(request);
		let version = require("../package.json").version;

		expect(requestConfig.hasOwnProperty("headers")).to.equal(true);
		expect(requestConfig.headers["Content-Type"]).to.equal("application/json; charset=utf-8");
	});

	it ("has a response with the right status code.", function () {
		let sender = new HttpSender();
		let mockResponse = {
			status: 200
		};
		let smartyResponse = sender.buildSmartyResponse(mockResponse);

		expect(smartyResponse.hasOwnProperty("statusCode")).to.equal(true);
		expect(smartyResponse.statusCode).to.equal(200);
	});

	it ("has a response with a payload.", function () {
		let sender = new HttpSender();
		let mockData = [1, 2, 3];
		let mockResponse = {
			status: 200,
			data: mockData
		};
		let smartyResponse = sender.buildSmartyResponse(mockResponse);

		expect(smartyResponse.hasOwnProperty("payload")).to.equal(true);
		expect(smartyResponse.payload).to.equal(mockData);
	});
});

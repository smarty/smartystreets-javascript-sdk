const chai = require("chai");
const expect = chai.expect;
const Axios = require("axios");
const Request = require("../source/request");
const HttpSender = require("../source/http_sender");

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
});

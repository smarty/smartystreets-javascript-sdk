const chai = require("chai");
const expect = chai.expect;
const RetrySender = require("../src/RetrySender");
const FailingSender = require("./FailingSender");
const Request = require("../src/Request.js");

function sendWithRetry(retries, inner) {
	const request = new Request();
	const sender = new RetrySender(retries, inner);
	return sender.send(request);
}

describe ("Retry Sender tests", function () {
	it("test success does not retry", function () {
		let inner = new FailingSender("200");
		sendWithRetry(5, inner);

		expect(inner.currentStatusCodeIndex).to.equal(1);
	});

	it("test client error does not retry", function () {
		let inner = new FailingSender("422");
		sendWithRetry(5, inner);

		expect(inner.currentStatusCodeIndex).to.equal(1);
	});

	it("test will retry until success", function () {
		let inner =  new FailingSender(["500", "500", "500", "200", "500"]);
		sendWithRetry(10, inner);

		expect(inner.currentStatusCodeIndex).to.equal(4);
	});

	it("test return response if retry limit exceeded", function () {
		const inner = new FailingSender(["500", "500", "500", "500", "500"]);
		const response = sendWithRetry(4, inner);

		expect(response);
		expect(inner.currentStatusCodeIndex).to.equal(5);
		expect(response.statusCode).to.equal("500");
	});

	// it("test backoff does not exceed max", function () {
	// 	let inner = new FailingSender(["500", "500", "500", "500", "500", "500", "500", "500", "500", "500", "500", "500", "500", "200"]);
	//
	// })
});
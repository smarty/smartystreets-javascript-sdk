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
	it("test success will not retry", function () {
		let inner = new FailingSender("200");
		sendWithRetry(5, inner);

		expect(1).to.equal(inner.currentStatusCodeIndex);
	});

	it("test with code that should not retry", function () {
		let inner = new FailingSender("422");
		sendWithRetry(5, inner);

		expect(1).to.equal(inner.currentStatusCodeIndex);
	});

	it("test will retry until success", function () {
		let inner =  new FailingSender(["500", "500", "500", "200", "500"]);
		sendWithRetry(10, inner);

		expect(4).to.equal(inner.currentStatusCodeIndex);
	});

	// it("test return response if retry limit exceeded", function () {
	// 	const inner = new FailingSender(["500", "500", "500", "500", "500"]);
	// 	const response = sendWithRetry(4, inner);
	//
	// })

	// it("test backoff does not exceed max", function () {
	// 	let inner = new FailingSender(["500", "500", "500", "500", "500", "500", "500", "500", "500", "500", "500", "500", "500", "200"]);
	//
	// })
});
const chai = require("chai");
const expect = chai.expect;
const RetrySender = require("../src/RetrySender");
const FailingSender = require("./FailingSender");
const Request = require("../src/Request.js");

function sendWithRetry(retries, inner) {
	const request = new Request();
	const sender = new RetrySender(retries, inner);
	sender.send(request);
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
});
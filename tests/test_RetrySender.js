const chai = require("chai");
const expect = chai.expect;
const RetrySender = require("../src/RetrySender");
const FailingSender = require("./fixtures/FailingSender");
const Request = require("../src/Request.js");
const FakeSleeper = require("../src/util/FakeSleeper");

function sendWithRetry(retries, inner, sleeper) {
	const request = new Request();
	const sender = new RetrySender(retries, inner, sleeper);
	return sender.send(request);
}

describe ("Retry Sender tests", function () {
	it("test success does not retry", function () {
		let inner = new FailingSender(["200"]);
		sendWithRetry(5, inner, new FakeSleeper());

		expect(inner.currentStatusCodeIndex).to.equal(1);
	});

	it("test client error does not retry", function () {
		let inner = new FailingSender(["422"]);
		sendWithRetry(5, inner, new FakeSleeper());

		expect(inner.currentStatusCodeIndex).to.equal(1);
	});

	it("test will retry until success", function () {
		let inner =  new FailingSender(["500", "500", "500", "200", "500"]);
		sendWithRetry(10, inner, new FakeSleeper());

		expect(inner.currentStatusCodeIndex).to.equal(4);
	});

	it("test return response if retry limit exceeded", function () {
		let inner = new FailingSender(["500", "500", "500", "500", "500"]);
		const sleeper = new FakeSleeper();
		const response = sendWithRetry(4, inner, sleeper);

		expect(response);
		expect(inner.currentStatusCodeIndex).to.equal(5);
		expect(response.statusCode).to.equal("500");
		expect(sleeper.sleepDurations).to.deep.equal([0, 1, 2, 3]);
	});

	it("test backoff does not exceed max", function () {
		let inner = new FailingSender(["500", "500", "500", "500", "500", "500", "500", "500", "500", "500", "500", "500", "500", "200"]);
		const sleeper = new FakeSleeper();

		sendWithRetry(20, inner, sleeper);

		expect(sleeper.sleepDurations).to.deep.equal([0,1,2,3,4,5,6,7,8,9,10,10,10]);
	});

	it("test empty status does not retry", function () {
		let inner = new FailingSender([]);
		sendWithRetry(5, inner, new FakeSleeper());

		expect(inner.currentStatusCodeIndex).to.equal(1);
	});

	it("test sleep on rate limit", function () {
		let inner = new FailingSender(["429", "200"]);
		const sleeper = new FakeSleeper();

		sendWithRetry(5, inner, sleeper);

		expect(sleeper.sleepDurations).to.deep.equal([10]);
	});

	it("test rate limit error return", function () {
		let inner = new FailingSender(["429"], {"Retry-After": 7});
		const sleeper = new FakeSleeper();

		sendWithRetry(10, inner, sleeper);

		expect(sleeper.sleepDurations).to.deep.equal([7]);
	});

	it("test retry after invalid value", function () {
		let inner = new FailingSender(["429"], {"Retry-After": "a"});
		const sleeper = new FakeSleeper();

		sendWithRetry(10, inner, sleeper);

		expect(sleeper.sleepDurations).to.deep.equal([10]);
	});

	it("test retry error", function () {
		let inner = new FailingSender(["429"], undefined, "Big Bad");
		const sleeper = new FakeSleeper();

		const response = sendWithRetry(10, inner, sleeper);

		expect(response.error).to.equal("Big Bad");
	});
});
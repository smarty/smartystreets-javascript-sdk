const chai = require("chai");
const expect = chai.expect;
const Client = require("../../source/international_street/client");
const Lookup = require("../../source/international_street/lookup");
const errors = require("../../source/errors");

describe("An International Street client", function () {
	it("has an inner sender.", function () {
		let mockSender = new MockSender();
		let client = new Client(mockSender);

		expect(client.sender).to.deep.equal(mockSender);
	});

	it("throws an error if sending without a lookup.", function () {
		let mockSender = new MockSender();
		let client = new Client(mockSender);

		expect(client.send).to.throw(errors.UndefinedLookupError);
	});

	function MockSender() {
		let sent = false;

		this.sent = sent;
		this.send = () => {
			sent = true;
		}
	}
});
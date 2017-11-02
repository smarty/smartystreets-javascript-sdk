const chai = require("chai");
const expect = chai.expect;

describe("A client", function () {
	it ("has a sender.", function () {
		const Client = require("../../us_street/client");
		const mockSender = {};
		const client = new Client(mockSender);

		expect(client.sender).to.deep.equal(mockSender);
	});
});

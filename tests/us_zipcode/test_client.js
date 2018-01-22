const chai = require("chai");
const expect = chai.expect;
const Client = require("../../source/us_zipcode/client");

describe("A US Zipcode client", function () {
	it("has a sender.", function () {
		const mockSender = {};
		const client = new Client(mockSender);

		expect(client.sender).to.deep.equal(mockSender);
	});
});
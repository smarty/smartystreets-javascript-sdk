const chai = require("chai");
const expect = chai.expect;
const Client = require("../../source/us_zipcode/client");
const Lookup = require("../../source/us_zipcode/lookup");

describe("A US Zipcode client", function () {
	it("has a sender.", function () {
		const mockSender = {};
		const client = new Client(mockSender);

		expect(client.sender).to.deep.equal(mockSender);
	});

	it("calls its inner sender's send function.", function () {
		const mockSender = {
			send: function (request) {
				sentFlag = true;
				mockSenderRequest = request;
			}
		};
		const client = new Client(mockSender);
		let lookup = new Lookup();
		let sentFlag = false;
		let mockSenderRequest = {};

		client.sendLookup(lookup);

		expect(sentFlag).to.equal(true);
	});

});
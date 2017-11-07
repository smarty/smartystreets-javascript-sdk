const chai = require("chai");
const expect = chai.expect;
const Client = require("../../us_street/client");
const Lookup = require("../../us_street/lookup");

describe("A client", function () {
	it ("has a sender.", function () {
		const mockSender = {};
		const client = new Client(mockSender);

		expect(client.sender).to.deep.equal(mockSender);
	});

	it ("calls its inner sender's send function.", function () {
		const mockSender = {
			send: function(senderLookup) {
				sentFlag = true;
				mockSenderLookup = senderLookup;
			}
		};
		const client = new Client(mockSender);
		let lookup = new Lookup();
		let sentFlag = false;
		let mockSenderLookup = {};

		client.sendLookup(lookup);

		expect(sentFlag).to.equal(true);
		expect(mockSenderLookup).to.deep.equal(lookup);
	});
});

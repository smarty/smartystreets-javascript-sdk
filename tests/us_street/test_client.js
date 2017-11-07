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
			send: function(request) {
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
		expect(mockSenderRequest).to.deep.equal(lookup);
	});

	// it ("builds a request with the correct JSON payload.", function () {
	// 	function MockSender () {
	// 		let request = {};
	// 		this.request = request;
	//
	// 		this.send = function (request) {
	//
	// 		}
	// 	}
	//
	// 	let mockSender = new MockSender();
	// 	const client = new Client(mockSender);
	// 	let lookup = new Lookup("1", "2", "3", "4");
	//
	// 	client.sendLookup(lookup);
	//
	//
	// });
});
